

export const SubTitleColor='#7D7D7D';
export const IconColor='#858585';
export const WindowsBlue='#0078D4';
export const GuiJiBlue='#0158A5';
export const LogoBlue='#1893F8';
export const extraInfomationColor='#D7D7D7';
export const borderColorGray='#2B2B2B'
export const SunSetOrigin='#FF6233'
export const ErrorColor='#F44336'

const backgroundGradientColorScheme=[
    "#FF9830 ,#FF5830, #0078D4",//So sososososo beautiful.I like it so much
    "#FF626E ,#FFBE71",
    "#52AD91 ,#D77B43",
    "#0057A7 ,#0090FF",
    "#1C2842,#717C7D,#B88869",
    "#833C26,#8F5516,#305A70,#185379",//colorful in seaside
    "#21437C,#5180AD,#7092AA,#B06D34",//sunset
    "#C64F3C,#F5853B",//sun in sunset
    "#1282BA,#70C499",//sky blue to green
    "#EC6244,#4B8E94",//sunset sea
    "#F1637B,#EF3F55",//pink gradiant
];

const backgroundGradientOrientationScheme=[
    "to left",
    "to left top",
    "to top left",
    "to left bottom",
    "to bottom left",
    "to right",
    "to right top",
    "to top right",
    "to right bottom",
    "to bottom right",
]

export const randomGradient=()=>{
    let colorIndex=Math.floor(Math.random()*backgroundGradientColorScheme.length);
    let orientationIndex=Math.floor(Math.random()*backgroundGradientOrientationScheme.length);

    return "linear-gradient("+backgroundGradientOrientationScheme[orientationIndex]+","+backgroundGradientColorScheme[colorIndex]+")";
}

const tagColors=[
    "success", "processing", "error", "default", "warning",
    "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime",
]

const randomHexColor=():string=>{
    const hexNumChar=[
        "0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"
    ]

    let color:string="#";

    for(let i=0;i<6;++i){
        let index=Math.floor(Math.random()*hexNumChar.length);
        color+=hexNumChar[index];
    }
    
    return color;//maybe we should not use this because sometimes we can't show text correctly beacuse the text color is always white.
}

export const randomTagColor=():string=>{
    let colorIndex=Math.floor(Math.random()*tagColors.length+10);
    let color= colorIndex>=tagColors.length?randomHexColor():tagColors[colorIndex];

    return color;
}

export const randomInternalTagColor=():string=>{
    let colorIndex=Math.floor(Math.random()*tagColors.length);

    return tagColors[colorIndex];
}

export const emotionTagColors:{[index:string]:string}={
    "positive":"#EC6244",
    "negative":"#0057A7",
    "neutral":"#27C8CA",
    "mixed":"#E5395C"
}