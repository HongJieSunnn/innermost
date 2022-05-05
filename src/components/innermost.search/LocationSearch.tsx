import { Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, InputBase, List, ListItemButton, ListItemText, ListSubheader, Menu, MenuItem, Paper, Tooltip, Typography } from "@mui/material";
import { border, height } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useEffect, useState } from "react";
import { getAddressSuggessions, getCityLocation, locateByIP, LocationModel } from "../../services/apiServices/baiduMapService";

export const cities:{[index:string]: string[]}={
    "北京市":["北京市"],
    "天津市":["天津市"],
    "上海市":["上海市"],
    "重庆市":["重庆市"],
    "河北省":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],
    "山西省":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"],
    "辽宁省":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"],
    "吉林省":["长春市","吉林市","四平市","通化市","白山市","辽源市","白城市","松原市"],
    "黑龙江省":["哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区",],
    "江苏省":["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市",],
    "浙江省":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市",],
    "安徽省":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市",],
    "福建省":["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市",],
    "江西省":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市",],
    "山东省":["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","临沂市","德州市","聊城市","滨州市","菏泽市",],
    "河南省":["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","济源市",],
    "湖北省":["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","随州市","恩施土家族苗族自治州",],
    "湖南省":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州",],
    "广东省":["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市",],
    "海南省":["海口市","三亚市","三沙市","儋州市","五指山市","琼海市","文昌市","万宁市","东方市","定安县","屯昌县","澄迈县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县",],
    "四川省":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州",],
    "贵州省":["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州",],
    "云南省":["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州",],
    "陕西省":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市",],
    "甘肃省":["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州",],
    "青海省":["西宁市","海东市","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州",],
    "台湾省":["台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市","新北市","桃园市","宜兰县","新竹县","苗栗县","彰化县","南投县","云林县","嘉义县","屏东县","台东县","花莲县","澎湖县",],
    "内蒙古自治区":["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟",],
    "广西壮族自治区":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市",],
    "西藏自治区":["拉萨市","日喀则市","昌都市","林芝市","山南市","那曲市","阿里地区",],
    "宁夏回族自治区":["银川市","石嘴山市","吴忠市","固原市","中卫市",],
    "新疆维吾尔自治区":["乌鲁木齐市","克拉玛依市","吐鲁番市","哈密市","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区", "石河子市","阿拉尔市","图木舒克市","五家渠市","北屯市","铁门关市","双河市","可克达拉市","昆玉市","胡杨河市",],
    "香港特别行政区":["香港特别行政区"],
    "澳门特别行政区":["澳门特别行政区"],
}


export default function LocationSearch(props:any){
    const [anchorElCities, setAnchorElCities] = useState<null | HTMLElement>(null);
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('通过 IP 定位城市👉');
    const [nowCities, setNowCities] = useState(new Array<string>());
    const [searchInputDisabled, setSearchInputDisabled] = useState(true);
    const [searchInputPlaceHolder, setSearchPlaceHolder] = useState("👈选择城市");

    const handleOpenCitiesMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCities(event.currentTarget);
    };
    const handleCloseCitiesMenu = () => {
        setAnchorElCities(null);
    };


    const handleProvinceClick=(e:React.MouseEvent<HTMLDivElement>)=>{
        let province:string=e.currentTarget!.firstChild?.nodeValue! as string;
        setProvince(province);
        setNowCities(cities[province])
    }

    const handleCityClick=(e:React.MouseEvent<HTMLDivElement>)=>{
        let city:string=e.currentTarget!.firstChild?.nodeValue! as string;
        setCity(city);
        handleSearchAble();
    }

    const handleLocateButtonClick=()=>{
        locateByIP({setProvince:setProvince,setCity:setCity});
        handleSearchAble();
    }

    const handleSearchAble=()=>{
        setSearchInputDisabled(false);
        setSearchPlaceHolder("🌏搜索位置")
        handleCloseCitiesMenu();
    }

    const handleCloseLocationMenu=()=>{
        //handleCityAsLocation();
        props.handleCloseLocationMenu();
    }

    const handleCityAsLocation=async()=>{
        let cityLocation=await getCityLocation(city);
        props.handleSelectLocation(cityLocation);
    }
    useEffect(() => {
      handleLocateButtonClick();
    }, [])
    
    return(
        <Menu 
            id="menu-location"
            anchorEl={props.anchorElLocationButton}
            open={Boolean(props.anchorElLocationButton)}
            onClose={handleCloseLocationMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    borderRadius:3,
                    border:1,
                    borderColor:'#FFA726',
                    bgcolor:'#161616',
                    width:500,
                    backgroundColor:'transparent',
                    backdropFilter:'blur(15px)'
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
            <DialogTitle>
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',width:450 }}
            >
                <Tooltip title='选择城市' placement="top">
                    <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleOpenCitiesMenu}>
                        <LocationCityIcon/>
                    </IconButton>
                </Tooltip>
                <LocationSearchCitiesMenu 
                    anchorElCities={anchorElCities} 
                    nowCities={nowCities}
                    province={province}
                    handleCloseCitiesMenu={handleCloseCitiesMenu}
                    handleProvinceClick={handleProvinceClick}
                    handleCityClick={handleCityClick}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    autoFocus
                    disabled={searchInputDisabled}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={searchInputPlaceHolder}
                    onChange={(e)=>getAddressSuggessions(e.target.value,city,props.setLocationSuggessions)}
                />
                <Tooltip title='选择该城市作为位置' placement="top">
                    <Button disabled={city==='通过 IP 定位城市👉'} sx={{ p: '10px' }} onClick={()=>{handleCityAsLocation();handleCloseLocationMenu();}}>
                        {city}
                    </Button>
                </Tooltip>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title='自动定位的城市不对？请通过左边选择城市按钮手动选择，或点击该按钮重新定位。' placement="top">
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleLocateButtonClick}>
                        <HelpOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            </DialogTitle>
            <Divider/>
            <Grid sx={{height:400}}>
                {(props.locationSuggessions as Array<LocationModel>)?.map((l,i)=>(
                    <MenuItem key={i} divider onClick={()=>props.handleSelectLocationIndex(i)}>
                        <InputBase 
                            readOnly 
                            multiline 
                            fullWidth 
                            placeholder={"🔎 "+l.locationName+"  "+l.province+(l.address == null?"":"-"+l.address)} 
                        />
                    </MenuItem>
                ))}
            </Grid>
        </Menu>
    )
}

export function LocationSearchCitiesMenu(props:any){
    const customList = (items: readonly any[],subHeader:string,onClick?:React.MouseEventHandler<HTMLDivElement>|undefined) => (
      <List dense component="div" role="list" subheader={<ListSubheader>{subHeader}</ListSubheader>} sx={{width: 200, height: 400, overflow: 'auto'}}>
        {items.map((value) => {
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={onClick}
              sx={{justifyContent:'center',borderRadius:3}}
            >
              {value}
            </ListItemButton>
          );
        })}
      </List>
    
  );

    return(
        <Menu
            id="menu-cities"
            anchorEl={props.anchorElCities}
            open={Boolean(props.anchorElCities)}
            onClose={props.handleCloseCitiesMenu}
            PaperProps={{
                elevation: 0,
                sx: {
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    '& .MuiList-root': {
                        paddingTop:0
                    },
                    '&:before': {
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    borderRadius:3,
                    bgcolor:'#161616',
                    width:400,
                    height:400
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <Grid container>
                <Grid item>
                    {customList(Object.keys(cities),"省份-"+props.province,props.handleProvinceClick)}
                </Grid>
                <Grid item>
                    {customList(props.nowCities,"城市",props.handleCityClick)}
                    {/*Specify the width and height(height is more important) can get two scrollbar or there will be just one scrollbar even if we have two list*/}
                </Grid>
            </Grid>
        </Menu>
    )
}