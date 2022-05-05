import { Avatar, Box, Button, Container, FormControl, Grid, IconButton, InputLabel, Link, MenuItem, Paper, Select, SelectChangeEvent, Step, StepLabel, Stepper, TextField, Tooltip, Typography } from "@mui/material";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { LocationModel } from "../../services/apiServices/baiduMapService";
import { cities, LocationSearchCitiesMenu } from "../innermost.search/LocationSearch";
import { Bucket, cos, Region } from "../../services/tencentCloud/cos";
import { styled } from '@mui/material/styles';
import { guid } from "../../services/guidServices";
import moment from "moment";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { read } from "fs";

export interface RegisterModel{
    userName:string|null
    email:string|null
    password:string|null
    confirmPassword:string|null
    nickName:string|null
    birthday:string
    userAvatarUrl:string
    userBackgroundImageUrl:string
    gender:string
    selfDescription?:string
    school?:string
    province?:string
    city?:string
}

export default function Register(props:any){
    const [registerModel, setRegisterModel] = useState<RegisterModel>({
        userName:null,
        email:null,
        password:null,
        confirmPassword:null,
        nickName:null,
        birthday:'2020-01-01',
        userAvatarUrl:"",
        userBackgroundImageUrl:"https://innermost-user-img-1300228246.cos.ap-nanjing.myqcloud.com/backgrounds/default-bgimg.jpg",
        gender:'OTHER',
    });

    const steps = ['账号信息*', '个人信息', '注册账号'];
    const stepFroms=[
        <AccountInfmationForm/>,
        <PersonalInfmationForm/>,
        <RegisterConfirmForm/>
    ]

    function RegisterStepper(props:any){
        const [activeStep, setActiveStep] = React.useState(0);
        const [skipped, setSkipped] = React.useState(new Set<number>());

        const isStepOptional = (step: number) => {
            return step === 1;
        };

        const isStepSkipped = (step: number) => {
            return skipped.has(step);
        };

        const handleNext = () => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleSkip = () => {
            if (!isStepOptional(activeStep)) {
                throw new Error("You can't skip a step that isn't optional.");
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
            });
        };
        

        const [registerButtonLoading, setRegisterButtonLoading] = useState(false);
        const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);
        const [registerButton, setRegisterButton] = useState("注册");
        const handleRegisterConfirmFormBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setRegisterButton("注册");
            setRegisterButtonDisabled(false);
        };
        const handleRegisterButtonClick=async ()=>{
            setRegisterButtonLoading(true);
            await axios
                .post("https://localhost:5106/Account/Register",registerModel)
                .then(res=>{
                    if(res.status===200){
                        handleNext();
                        return res.data;
                    }

                    if(res.status===400){
                        setRegisterButton("注册失败，请检查必需信息是否输入正确");
                        setRegisterButtonDisabled(true);
                        setRegisterButtonLoading(false);
                    }
                })
                .catch((rea)=>{
                    setRegisterButton("注册失败，请检查必需信息是否输入正确，或联系管理员")
                    setRegisterButtonDisabled(true);
                    setRegisterButtonLoading(false);
                })
        }
        return(
            <Box sx={{ width: '100%' , p:3}}>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                labelProps.optional = (
                    <Typography variant="caption"></Typography>
                );
                }
                if (isStepSkipped(index)) {
                stepProps.completed = false;
                }
                return (
                <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
                );
            })}
            </Stepper>
            {activeStep === steps.length ? (
            <Grid>
                <Grid item container justifyContent='center' alignItems='center'>
                    <Typography variant="h1" sx={{mt: 10,}}>
                        🎉
                    </Typography>
                </Grid>
                
                <Grid item container justifyContent='center' alignItems='center'>
                    <Typography sx={{  mb: 10 }}>
                        注册成功，请前往邮箱进行验证
                    </Typography>
                </Grid>
                
                <Grid item container justifyContent='center' alignItems='center'>
                    <Link href='/'>返回主页</Link>
                </Grid>
            </Grid>
            ) : (
            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>{stepFroms[activeStep]}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep === steps.length - 1 ? (
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleRegisterConfirmFormBack}
                    sx={{ mr: 1 }}
                    >
                        返回
                    </Button>
                ) : (
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                        返回
                    </Button>
                )}
                
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    跳过
                    </Button>
                )}
                    {activeStep === steps.length - 1 ? (
                        <LoadingButton disabled={registerButtonDisabled} loading={registerButtonLoading} onClick={handleRegisterButtonClick}> {registerButton} </LoadingButton>
                    ) : (
                        <Button onClick={handleNext}>下一步</Button>
                    )}
                </Box>
            </React.Fragment>
            )}
        </Box>
        )
    }

    function AccountInfmationForm(props:any){
        const [confirmPwdError, setConfirmPwdError] = useState(false);

        const handleUserNameChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.userName=e.target.value;
            setRegisterModel(registerModel);
        }

        const handleNickNameChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.nickName=e.target.value;
            setRegisterModel(registerModel);
        }

        const handleEmailChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.email=e.target.value;
            setRegisterModel(registerModel);
        }

        const handlePasswordChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.password=e.target.value;
            setRegisterModel(registerModel);
        }

        const handleConfirmPasswordChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.confirmPassword=e.target.value;
            if(registerModel.confirmPassword===registerModel.password){
                setConfirmPwdError(false);
            }else{
                setConfirmPwdError(true);
            }

            setRegisterModel(registerModel);
        }

        return(
            <Grid>
                <Grid container>
                    <Typography variant="h5">
                        账号信息
                    </Typography>
                    <Typography variant="subtitle2">
                        &nbsp;必需
                    </Typography>
                </Grid>
                <Grid item container spacing={1} sx={{mt:1}}>
                    <Grid item xs={6} >
                        <TextField
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            name="username"
                            label="用户名"
                            type="username"
                            id="username"
                            onChange={handleUserNameChange}
                            size="small"
                            helperText='4-20位，可包含英文数字_-'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="nickname"
                            label="昵称"
                            type="nickname"
                            id="nickname"
                            onChange={handleNickNameChange}
                            size="small"
                            helperText='1-30个字符'
                        />
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="邮箱"
                    type="email"
                    id="email"
                    onChange={handleEmailChange}
                    size="small"
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="密码"
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                    size="small"
                />

                <TextField
                    error={confirmPwdError}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="确认密码"
                    type="password"
                    id="confirmpassword"
                    onChange={handleConfirmPasswordChange}
                    size="small"
                    helperText='8-30位，可包含英文数字_-'
                />
            </Grid>
        )
    }

    const Input = styled('input')({
        display: 'none',
    });

    const allowImageType:Set<string>=new Set<string>([
        'jpg','jpeg','png'
    ]);

    function PersonalInfmationForm(props:any){
        const [anchorElCities, setAnchorElCities] = useState<null | HTMLElement>(null);
        const [province, setProvince] = useState('');
        const [city, setCity] = useState('点击选择城市');
        const [nowCities, setNowCities] = useState(new Array<string>());
        const handleOpenCitiesMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElCities(event.currentTarget);
        };
        const handleCloseCitiesMenu = () => {
            setAnchorElCities(null);
        };
        const handleProvinceClick=(e:React.MouseEvent<HTMLDivElement>)=>{
            let province:string=e.currentTarget!.firstChild?.nodeValue! as string;
            setProvince(province);

            registerModel.province=province;
            setRegisterModel(registerModel);

            setNowCities(cities[province])
        }
        const handleCityClick=(e:React.MouseEvent<HTMLDivElement>)=>{
            let city:string=e.currentTarget!.firstChild?.nodeValue! as string;
            setCity(city);

            registerModel.city=city;
            setRegisterModel(registerModel);

            handleCloseCitiesMenu();
        }

        const [avatarButton, setAvatarButton] = useState("点击上传头像");
        const [bgButton, setBgButton] = useState("点击上传背景");
        const handleAvatarUrlChange=(url:string)=>{
            registerModel.userAvatarUrl=url;
            setRegisterModel(registerModel);
        }
        const handleBgUrlChange=(url:string)=>{
            registerModel.userBackgroundImageUrl=url;
            setRegisterModel(registerModel);
        }
        const handleUpload=(e:any,imageFolder:string,setButton:(value: React.SetStateAction<string>) => void,setUrl:(url: string) => void)=>{
            e.preventDefault();
            let name=guid();
            let file:File = e.target.files[0];
            let type=file.type.substring(file.type.lastIndexOf('/')+1,file.type.length);
            if(!allowImageType.has(type.toLowerCase())){
                setButton("图像格式不允许");
                return;
            }
            cos.putObject({
                Bucket: Bucket,
                Region: Region,
                Key: imageFolder+name+'.'+type,
                StorageClass: 'STANDARD',
                Body: file,
                onProgress: function(progressData) {
                    setButton("上传中  "+progressData.percent*100+"%");
                    console.log(JSON.stringify(progressData));
                }
            }, function(err, data) {
                setButton("上传成功");
                setUrl("https://"+data.Location);
            });
        }

        const [gender, setGender] = useState('');
        const handleGenderChange=(event: SelectChangeEvent)=>{
            registerModel.gender=event.target.value as string;
            setGender(registerModel.gender);
            setRegisterModel(registerModel);
        }

        const handleSchoolChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.school=e.target.value;
            setRegisterModel(registerModel);
        }

        const handleSelfDescriptionChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
            registerModel.selfDescription=e.target.value;
            setRegisterModel(registerModel);
        }

        const handleBirthdayChange=(date:any, dateString:string)=>{
            registerModel.birthday=dateString;
            setRegisterModel(registerModel);
        }

        function disabledDate(current:any) {
            // Can not select days before today and today
            return current && current > moment().endOf('day');
        }

        return(
            <Grid>
                <Typography variant="h5">
                    个人信息
                </Typography>
                <Grid item container mt={1} spacing={1} justifyContent='center'>
                    <Grid item xs={4}>
                        <label htmlFor="avatar-file">
                            <Input accept="image/*" id="avatar-file" multiple type="file" onChange={(e)=>{handleUpload(e,"/avatars/",setAvatarButton,handleAvatarUrlChange)}}/>
                            <Button fullWidth variant="outlined" component="span">{avatarButton}</Button>
                        </label>
                    </Grid>

                    <Grid item xs={4}>
                        <label htmlFor="bg-file">
                            <Input accept="image/*" id="bg-file" multiple type="file" onChange={(e)=>{handleUpload(e,"/backgrounds/",setBgButton,handleBgUrlChange)}}/>
                            <Button fullWidth variant="outlined" component="span">{bgButton}</Button>
                        </label>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth variant="outlined" onClick={handleOpenCitiesMenu}>{city}</Button>
                        <LocationSearchCitiesMenu 
                            anchorElCities={anchorElCities} 
                            nowCities={nowCities}
                            province={province}
                            handleCloseCitiesMenu={handleCloseCitiesMenu}
                            handleProvinceClick={handleProvinceClick}
                            handleCityClick={handleCityClick}
                        />
                    </Grid>
                </Grid>

                <Grid item container mt={1} spacing={1} justifyContent='center'>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="gender-select-label">性别</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                label="性别"
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <MenuItem value={'MALE'}>男</MenuItem>
                                <MenuItem value={'FEMALE'}>女</MenuItem>
                                <MenuItem value={'OTHER'}>其它</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="school"
                            label="学校"
                            type="school"
                            id="school"
                            onChange={handleSchoolChange}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <DatePicker disabledDate={disabledDate} onChange={handleBirthdayChange} placeholder='出生日期' locale={zhCN} style={{width:'100%',height:'100%'}}/>
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={3}
                    name="selfdescription"
                    label="自我介绍"
                    type="selfdescription"
                    id="selfdescription"
                    onChange={handleSelfDescriptionChange}
                    size="small"
                />
            </Grid>
        )
    }

    function RegisterConfirmForm(props:any){
        return(
            <Grid p={2} mt={8}>
                <Grid mt={1}>
                    <b>账号: {registerModel.userName??"请返回填写"}</b>
                </Grid>
                <Grid mt={1}>
                    <b>昵称: {registerModel.nickName??"请返回填写"}</b>
                </Grid>
                <Grid mt={1}>
                    <b>邮箱: {registerModel.email??"请返回填写"}</b>
                </Grid>
            </Grid>
        )
    }

    return(
        <Paper elevation={1} sx={{
            marginTop:16,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            borderRadius:5
        }}>
            <RegisterStepper/>
        </Paper>
    )
}