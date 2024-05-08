import React, { useEffect } from "react";

const WarningMessage = () => {
  const cssRule = [
    "color: rgb(255, 0, 0);" +
      "font-size: 45px;" +
      "font-weight: bold;" +
      "font-family: Arial, sans-serif;" +
      "text-shadow: 2px 2px 1px rgb(0,0,0);" +
      "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);",
    "color: rgb(0, 0, 0);" + "font-size: 20px;" + "font-family: poppins, sans-serif;",
  ];

  const msg = [
    "%cSTOP!",
    "%cIf someone told you to copy/paste something here, there's an 177013/10 chance that you're being scammed.\n\n\nUnless you REALLY understand exactly what you are doing, close this window and stay safe.",
    "%c止まれ!",
    "%cもし誰かがここに何かをコピー&ペーストするように言ったら、それが絶対に詐欺の可能性があるんですよ。\n\n\n本当に何をしているのかを完全に理解していないなら、このウィンドウを閉じて安全に保つようにしてね。",
    ];

  useEffect(() => {
    setTimeout(() => {
        console.log(msg[0], cssRule[0]);
        console.log(msg[1], cssRule[1]);
        console.log(msg[2], cssRule[0]);
        console.log(msg[3], cssRule[1]);
    }, 0);
  }, []);

  return null;
};

export default WarningMessage;
