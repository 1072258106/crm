(function(window){var svgSprite='<svg><symbol id="icon-junjia" viewBox="0 0 1169 1024"><path d="M442.800287 457.700407l197.907928 183.565796 272.166323-257.094515 94.974467 77.437701L1007.849006 218.130395l-265.645222 0 75.552192 70.340216-181.033389 177.04776-195.228359-177.04776-276.007856 261.659593 98.960096 80.70285L442.800287 457.700407zM61.317365 835.26515l1014.192287 0 0 71.646275L61.317365 906.911425 61.317365 835.26515 61.317365 835.26515zM61.317365 835.26515"  ></path></symbol><symbol id="icon-shoujihao" viewBox="0 0 1024 1024"><path d="M461.180343 863.904914c0-29.227886 22.7328-53.130971 50.819657-53.130971 28.0576 0 50.819657 23.903086 50.819657 53.130971 0 29.578971-22.762057 53.482057-50.819657 53.482057C483.9424 917.386971 461.180343 893.483886 461.180343 863.904914L461.180343 863.904914 461.180343 863.904914zM302.226286 106.642286l419.605943 0c24.722286 0 44.821943 20.8896 44.821943 47.016229l0 524.756114c0 26.185143-20.128914 46.986971-44.821943 46.986971L302.226286 725.4016c-24.693029 0-44.792686-20.831086-44.792686-46.986971L257.4336 153.658514C257.4336 127.502629 277.533257 106.642286 302.226286 106.642286L302.226286 106.642286 302.226286 106.642286zM155.765029 938.627657C155.765029 985.673143 192.190171 1024 237.304686 1024l549.770971 0c44.763429 0 81.159314-38.326857 81.159314-85.372343L868.234971 85.372343C868.264229 38.356114 831.839086 0 787.075657 0L237.304686 0C192.190171 0 155.735771 38.356114 155.735771 85.372343L155.765029 938.627657 155.765029 938.627657 155.765029 938.627657z"  ></path></symbol><symbol id="icon-iconmoney" viewBox="0 0 1024 1024"><path d="M958.057333 64.612385l-164.85323 0-185.357328 249.481452c-49.432885 67.61016-79.667985 112.55149-90.7073 134.823989l-3.15566 0c-32.609691-54.160279-124.625704-182.258429-276.066827-384.305441l-174.316014 0 324.180206 406.776805L121.968801 471.38919l0 89.881061 311.559762 0 0 123.878011L121.968801 685.148261l0 91.034279 311.559762 0 0 180.341928 154.594585 0L588.123149 776.18274l300.518249 0 0-91.034279L588.125547 685.148461l0-123.878011 300.518249 0 0-89.881061L630.721467 471.38939 958.057333 64.612385z"  ></path></symbol><symbol id="icon-renshu" viewBox="0 0 1111 1024"><path d="M1086.724356 761.652893H1022.506563c-12.445309-121.964025-114.994652-214.557122-237.45649-214.557122-16.427807 0-33.353427 1.991249-48.78561 4.978123 17.423432-17.921245 32.357803-37.833738 44.803111-59.737482 3.484686 0.497812 6.471561 0.995625 9.956247 0.995625 82.139037 0 148.845892-66.706855 148.845892-148.845892s-66.706855-148.845892-148.845892-148.845892c-3.484686 0-6.471561 0.995625-9.956247 0.995624-11.449684-19.414682-24.890617-37.833738-40.3228-54.261545 15.929995-3.982499 32.357803-6.471561 49.781235-6.471561 115.492465 0 208.583374 93.588721 208.583374 208.583374 0 69.195916-34.349052 134.409334-92.095285 173.238697 100.558094 42.31405 169.256198 135.902771 179.710258 243.928051z" fill="" ></path><path d="M887.101604 993.135634c-0.995625-189.168692-124.453087-354.940204-305.656781-410.197374 94.086534-55.257171 151.334954-156.313077 151.334953-265.333982 0-169.754011-137.396208-307.648031-307.648031-307.648031-118.977151 0-227.002431 68.698104-277.77929 175.727759-72.680603 153.824016-7.467185 337.516772 146.35683 410.197375-161.291201 65.213418-267.823043 222.52212-268.818668 396.756441v4.978124l862.210987 0.497812v-4.978124z" fill="" ></path></symbol><symbol id="icon-dingdanbishu" viewBox="0 0 1024 1024"><path d="M662.014406 66.687291v159.9983s5.311944 45.311519 50.623462 37.311604h141.374498l-191.99796-197.309904z"  ></path><path d="M904.635828 949.301914c10.687886 77.311179-53.311434 74.687206-53.311433 74.687206H134.020016C67.332725 1023.98912 64.388756 951.989885 64.388756 951.989885L64.644753 133.310584C59.33281 63.99932 134.020016 0 134.020016 0h439.995325v325.308544h331.836474l-1.215987 623.99337zM694.014066 511.99456H256.642713v71.999235h437.371353V511.99456z m0 189.309989H256.642713v71.999235h437.371353v-71.999235z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)