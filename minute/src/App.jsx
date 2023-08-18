import { createAssistant, AssistantAppState, createSmartappDebugger } from '@salutejs/client';//'@sberdevices/assistant-client';
import {useState, useMemo, useEffect} from 'react';
import { typography } from '@salutejs/plasma-tokens';
import './App.css';
import './Ins.css';
import './PopUp.css';

import {GeneralHeader, AlertItem, ModalDebug, add_evg_func, revert_to_old_debug, exec_evg_func, get_evg_func, send_object, press_on_item, show_alert, show_legend, hide_legend, show_info, hide_info, get_random_string, Junk, showPopUp, hidePopUp} from './Utils.jsx';

import { IconPlus, IconHouseSbol, IconChevronLeft, IconCall, IconChevronRight } from '@salutejs/plasma-icons';

const initialize = (getState) => {
  console.log("info: " + getState);
  if (process.env.REACT_APP_DEB === "test"){
    return createSmartappDebugger({
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJjMzRkZDE4Mi0zZDkzLTQ5MGMtOTM4MS02ZGVjZjIxMmE4YWIiLCJzdWIiOiJkYzY3MTZkNTkzN2I0ZjlhMGM2YzZkNmY3NzMwN2Y0NmEzZDViZTRkZTY3MDg3MzA0YjQ5MzNmNzc1MzIzNGExNTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTY4OTg1MjA3NCwiYXVkIjoiVlBTIiwiaWF0IjoxNjg5NzY1NjY0LCJ0eXBlIjoiQmVhcmVyIiwic2lkIjoiMGZhNGNjNmEtYWY0Yy00MjIxLWE0OGQtN2U0MTY1Njg4NDZmIn0.XqCBNkE3Gl_cgVoxd-vAWXYUZnLTf-nfgovR6hEVMqrnlCoPiEeBw1Lx9s9wA95kIVtpmzc0bfyExenvegi1r_J37q5eSNd-_euZ44W_879SBzRvZIFP7RLhI9wAhZEzy81cqXokARyOTJYr24IKCKenZrKorYLNlMvMX0Fh_WCEii9GIzhZY7SYIgdBiZtoMpQ-fBKsEpzt_mjtniedkKlHyCn7P2JeQq1hn1aGWrvXRziZT68J109cyGS1HBLliWr5te8jM72blYdM-Y8vrHcgPmgMcg4Dno2HoR4bcUMQyQmyXuVVvwZVFIQ0Tle7ijScJbrwKP96y_AcWPPz5n7vWNeH7vt7erL3Z_1wFxsd_Cp5gDiEK3tf0k-MjddU3kPsTB0du8raQyiPWc3fw-55Rxw6Xnf0tXZqurdfO6wnNDLTLkLUOvJsZ8feMMH_w-7MUKoyorzkNMf7wZvlgdYOwa4PSKfLJBiRir5Gn7P0NMnRrgvoQ8XSAdQpC5GkZCE5Ie51sWIFJMBEECHxPUoUy9VoN2zXd1oIftP2hRn7nvSEg6cBBWTI1iYtSTaleS_FUEmtEeArpsTpGlgxVHSUsxiCOhcgzzx9_LbWoiiBHi-7urQbM-cjiASS9sySYd-ntQJBKOyf_2xDHx9rbwdhk72lPEKeLMn5EgDifdY",
      initPhrase: 'запусти meditation121',
      getState,
      enableRecord: true,
      recordParams: {
	defaultActive: true,
      }
    });
  }
  return createAssistant({ getState});
}

const default_text = [
  {
    arr: ["Остановитесь",
	  "Проведите эту минуту осознанно",
	  "Сделайте глубокий вдох и глубокий выдох",],
    time: 4000
  },
  
  {
    arr: ["Где Вы сейчас?" ,
	  "Что окружает Вас в данный момент?",],
    time: 4000
  },
  

  
  {arr: ["Сделайте глубокий вдох" ,
	 "Почувствуйте как расширяются Ваши легкие, наполняются воздухом",
	 "Выдохните",],
   time: 5000
  },

  
  {arr: ["Вдох –" ,
         "Прислушайтесь к биению своего сердца –" ,
	 "Выдох" ,],
   time: 5000
  },

  
  {
    arr: ["Переведите свое внимание на стопы, таз, позвоночник – ощутите внутреннюю опору",       
	  "Еще один вдох и выдох" ,
	  "Вы дышите ровно и размеренно" ],
    time: 6000
  }
  
];

function Point(props)
{
    return <circle fill="blue" r="2" cx={props.x} cy={props.y} />;
}

function put(q)
{
  return q[0] + " " + q[1] + " ";
}

var f1;


function Smile(props)
{
  let size = Number(props.size);
  let data = props.data;
  if (data === undefined)
    data = [10, 20, 30];
  const [k, setK] = useState(0);

  // function get_smiley(center, dist, width,  proc) {
  // 	let ret = [];
  
  // 	if (k < 1)
  // 	    return <></>;

  // 	let r = k - 1;

  // 	let q1 = Array();
  // 	Object.assign(q1, center);
  // 	let q2 = Array();
  // 	Object.assign(q1, center);

  
  // 	q1[1] += dist/2;
  

  // 	ret.push(
  // 	    <path d="M " + put(center) +  />
  // 	)

  // 	return <></>;
  // }

  function get_eyes(center, dist, width, proc, color, coef=1) {
    if (proc <= 0.001)
      proc = 0.001
    if (proc >= 0.999)
      proc = 0.999;
    let ret = [];
    let quan =0.9;
    let q1 = [center[0] - coef * (dist/2) * quan + width/2 , center[1] - (dist/2) * quan ];
    let q2 = [center[0] - coef * (dist/2) * quan - width/2 , center[1] - (dist/2) * quan ];

    let g1 = [];
    let g2 = [];
    Object.assign(g1, q1);
    Object.assign(g2, q2);
    g1[1] += ((dist / 2  * quan) - width/2) * (proc);
    g2[1] += ((dist / 2  * quan) - width/2) * (proc);
    
    // ret.push(<circle cx={q1[0]} cy={q1[1]} r={2} fill="purple" /> );
    // ret.push(<circle cx={q2[0]} cy={q2[1]} r={2} fill="purple" /> );
    // ret.push(<circle cx={g1[0]} cy={g1[1]} r={4} fill="aqua" /> );
    // ret.push(<circle cx={g2[0]} cy={g2[1]} r={4} fill="aqua" /> );
    ret.push(<path d={"M " + put(q1)  +
		      " A " + width/2 + " " + width/2 + " 0 1 0 " + put(q2)
		      + " L " + put(g2)
		      + " A " + width/2 + " " + width/2 + " 0 1 0 " + put(g1)
		      + " L " + put(q1)
		     }
		                        fill={color}
		                   />);
    return ret;
  }

  function get_lower(center, dist, width, proc, color) {
    if (proc <= 0.001)
      proc = 0.001
    if (proc >= 0.999)
      proc = 0.999;

    let ret = [];
    let quan = 0.8;
    let q1 = [center[0] - (dist/2) * quan, center[1] + (dist/2) * quan];

    
    let norm = [q1[0] - center[0], q1[1] - center[1]];
    let len = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1]);
    norm[0] /= len;
    norm[1] /= len;

    let q2 = [q1[0] + width * norm[0], q1[1] + width * norm[1]];
    let ang = (Math.asin(norm[1]));

    // p is for polar
    let g1p = [ang - (1 - proc) * ang * 2 , Math.sqrt(Math.pow(center[0] - q1[0], 2) + Math.pow(center[1] - q1[1], 2))];
    let g1 = [center[0] + Math.sin(g1p[0]) * g1p[1], center[1] + Math.cos(g1p[0]) * g1p[1]];

    let g2p = [ang - (1 - proc) * ang * 2 , Math.sqrt(Math.pow(center[0] - q2[0], 2) + Math.pow(center[1] - q2[1], 2))];
    let g2 = [center[0] + Math.sin(g2p[0]) * g2p[1], center[1] + Math.cos(g2p[0]) * g2p[1]];


    // ret.push(<circle cx={q1[0]} cy={q1[1]} r={2} fill="blue" /> );
    // ret.push(<circle cx={q2[0]} cy={q2[1]} r={2} fill="purple" /> );
    // ret.push(<circle cx={g1[0]} cy={g1[1]} r={4} fill="aqua" /> );
    // ret.push(<circle cx={g2[0]} cy={g2[1]} r={4} fill="aqua" /> );

    ret.push(<path d={"M " + put(q1)
		      + " A " + width/2 + " " + width/2 + " 0 1 0 " + put(q2)
		      + " A " + g2p[1] + " " + g2p[1] + " 0 0 0 " + put(g2)
		      + " A " + width/2 + " " + width/2 + " 0 1 0 " + put(g1)
		      + " A " + g1p[1] + " " + g1p[1] + " 0 0 1 " + put(q1)
		     }
	      fill={color}
	 />);
    return ret;
  }

  function get_paths(center, dist, width, proc, color) {
    let ret = [];
    if (proc !== 0)
      ret = ret.concat(get_path_start(center, dist, width, proc, color));
    if (proc > 1)
      ret = ret.concat(get_eyes(center, dist, width, (proc - 1) * 3, color, 1));
    if (proc > 1.33)
      ret = ret.concat(get_eyes(center, dist, width, (proc - 1.33) * 3, color, -1));
    if (proc > 1.66)
      ret = ret.concat(get_lower(center, dist, width, (proc - 1.66) * 1.5, color));
    return ret;
    
  }
  
  function get_path_start(center, dist, width, proc, color) {
    if (proc <= 0.001)
      proc = 0.001
    if (proc >= 0.999)
      proc = 0.999;
    let ret = []
    //By the law of cosines we find an angle between the center of the circle and
    // OY line; also setting it from starting point
    let alpha = Math.PI / 2 - Math.acos(1 - ((width * width) / (8 * dist * dist)));

    //calculating normal and inverting y-axis
    let norm = [Math.cos(alpha), -Math.sin(alpha)];

    //calculating distanse to two points
    let l1 = dist - width / 2;
    let l2 = dist + width / 2;

    //calculating copints themselves
    let q1 = [norm[0] * l1, norm[1] * l1];
    let q2 = [norm[0] * l2, norm[1] * l2];
    q1[0] += center[0];
    q1[1] += center[1];

    q2[0] += center[0];
    q2[1] += center[1];


    let lsf = "0";
    // let lsfm1 = "1";
    if (proc > 0.5) {
      lsf = "1";
      // lsfm1 = "0";
    }
    
    let beta = alpha - (2 * Math.PI * proc);

    let norm1 = [Math.cos(beta), -Math.sin(beta)];

    let g1 = [norm1[0] * l1, norm1[1] * l1];
    let g2 = [norm1[0] * l2, norm1[1] * l2];

    g1[0] += center[0];
    g1[1] += center[1];

    g2[0] += center[0];
    g2[1] += center[1];

    // fill="url(#Gradient1)"

    ret.push( <path key="1" d={"M " + put(q1) + "A " + width/2 + " " + width/2 + " 0 0 1 " + put(q2)
			       + "A " + l2 + " " + l2 + " 0 " + lsf +  "  1 " + put(g2)
			       + "A " + width/2 + " " + width/2 + " 0 0 1 " + put(g1)
			       + "A " + l1 + " " + l1 + " 0 " + lsf + " 0 " + put(q1)
			      } id="swift"
		         fill={color}

		    />);

    // ret.push( <path key="2" d={"M " + put(q1) + "A " + width/2 + " " + width/2 + " 0 0 1 " + put(q2)
    // 		   + "A " + l2 + " " + l2 + " 0 " + lsfm1 +  "  0 " + put(g2)
    // 		   + "A " + width/2 + " " + width/2 + " 0 0 1 " + put(g1)
    // 		   + "A " + l1 + " " + l1 + " 0 " + lsfm1 + " 1 " + put(q1)
    // 		  } fill={color + "2a" } />);
    

    


    // ret.push( <circle cx={g2[0]} cy={g2[1]} r={5} fill="red" /> )
    // ret.push( <path d={"M " + put(center) + "L " + put(q2)} stroke="black" fill="none"/> )

    
    
    // for (let i = 0; i < 1; i+= 0.03) {

    //     beta = alpha - (2 * Math.PI * i);

    //     norm1 = [Math.cos(beta), -Math.sin(beta)];

    //     g1 = [norm1[0] * l1, norm1[1] * l1];
    //     g2 = [norm1[0] * l2, norm1[1] * l2];
    //     g1[0] += center[0];
    //     g1[1] += center[1];
    
    //     g2[0] += center[0];
    //     g2[1] += center[1];
    
    //     ret.push( <circle cx={g2[0]} cy={g2[1]} r={2} fill="red" /> )
    //     ret.push( <circle cx={g1[0]} cy={g1[1]} r={2} fill="green" /> )	    
    // }
    return ret;
  }

  

  f1 = () =>  {
    let ofc = 0;
    let ttl = 2000;
    let delta = 16;
    let id = setInterval(
      () => {
	if (ofc >= ttl * 3)
	  clearInterval(id);
	else {
	  ofc += delta;
	  setK(ofc / ttl);
	}
	
      }, delta
    )
  }

  // <button  style={
  // 		    {
  // 			position: "fixed",
  // 			top: "2em",
  // 			left: "2em",
  // 			padding: "10px"
  // 		    }}onClick={animate}>start</button>
  
  let center = [size/2, size/2];

  return <div >
	    <button  style={
	      {
		position: "fixed",
		top: "2em",
		left: "2em",
		padding: "20px"
	      }}onClick={f1}>start</button>
	    <svg width={size} height={size} key={10}>


	      <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
		<stop offset="0%" stopColor="#cf87da"/>
		<stop offset="50%" stopColor="#cfc4d1"/>
		<stop offset="100%" stopColor="#cab8df"/>
	      </linearGradient>
	      {get_paths(center, size/3, size/20, k, "url(#Gradient1)")}
	      
	    </svg>
	  </div>;

  // <path d={"M " + center[0] + " 0 l 0 " + size + " "} stroke="black"/>
  // <path d={"M 0 " + center[1] + " l " + size + " 0  "} stroke="black"/>
  
}

function PulsingCircle(props)
{
  const [gamma, setGamma] = useState(50);    
  const maxGamma = 50;

  function gammaToRad(g)
  {
    return g;
  }

  function gammaToColorArray(g)
  {
    // In this range we just have a cube of possible colors
    const range = [[0, 255], [0, 255], [0, 255]];

    return [
      range[0][0] + (g / maxGamma) * (range[0][1] - range[0][0]),
      range[1][0] + (g / maxGamma) * (range[1][1] - range[1][0]),
      range[2][0] + (g / maxGamma) * (range[2][1] - range[2][0]),
    ];
  }
  // return <>
  // 	       {JSON.stringify(gammaToColorArray(gamma))}
  // 	   </>

  function anim() {
    let ofc = 0;
    let ttl = 2000;
    let delta = 16;
    let id = setInterval(
      () => {
	if (ofc >= ttl && false)
	  clearInterval(id);
	else {
	  ofc += delta;
	  setGamma(Math.sin(ofc / ttl * Math.PI) * 25 + 100);
	}
	
      }, delta
    )
  }

  const val_arr = useMemo(
    () => {
      let ret = [];
      const max = 20;
      for (let i = 0; i <= max; i++) {
	ret.push(150 + Math.sin(Math.PI * 2 * (i / max)) * 25);
      }
      let str = "";
      ret.map(
	(i) => {
	  str += i + ";";
	}
      );

      return str;
    }, []
  )

  const dur = "4500ms";

  return <div width="100%" height="100%">
       <svg width="100%" height="100%">
	 <defs>
	   <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
	     <stop offset="90%" stopColor="rgb(255,255,255)" stopOpacity="1" />
	     <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0"/>
	   </radialGradient>
	   <linearGradient id="grad2" x1="30%" y1="70%">
	     <stop offset="0%" stopColor="#ffc0cb">
	       <animate attributeName="stop-color" values="#ffc0cb; #ffc0bb; #ffc0ab; #ffc0cb;" dur="4500ms" fill="freeze" repeatCount="indefinite" />
	     </stop>
	     <stop offset="100%" stopColor="#91bc9c">
	       <animate attributeName="stop-color" values="#ffc0bb; #ffc0ab; #ffc0cb; #ff748c;  #ffc0bb" dur="4500ms" fill="freeze" repeatCount="indefinite" />
	     </stop>
	   </linearGradient>
	 </defs>
	 <rect width="100%" height="500" fill="url(#grad2)"/>
	 <circle cx="50%" cy={250} r={100} fill="url(#grad1)">
	   <animate attributeName="r" values={val_arr} dur="4s" repeatCount="indefinite" />
	 </circle>

       </svg>
     </div>
}


function LavaStuff(props)
{
  const [tick, setTick] = useState(0);
  const [blobs, setBlobs] = useState([
    random_blob()
    // {
    //     points: [
    // 	{
    // 	    point: {
    // 		x: 74,
    // 		y: 236,
    // 	    },
    // 	    dir: {
    // 		x: 1,
    // 		y: 1, 
    // 	    }
    // 	},
    // 	{
    // 	    point: {
    // 		x: 122,
    // 		y: 50,
    // 	    },
    // 	    dir: {
    // 		x: 1,
    // 		y: 1
    // 	    }
    // 	},
    // 	{
    // 	    point: {
    // 		x: 250,
    // 		y: 230,
    // 	    },
    // 	    dir: {
    // 		x: 1,
    // 		y: 1
    // 	    }	    
    // 	}
    //     ],
    //     onScreen: true,
    // }
  ]);

  useEffect( () => {
    let nextFrame = new Array();
    nextFrame.push(random_blob());
    setBlobs(nextFrame);
  }, [])

  const max = 300;
  
  useEffect( () => {
    let nextFrame = new Array();
    Object.assign(nextFrame, blobs);

    nextFrame = nextFrame.filter( (i) => {
      
      let dt = 400;
      let kick = true;
      
      for (let j = 0; j < i.points.length; j++) {		
	if (i.points[j].point.x > 0 - dt && i.points[j].point.x < 300 + dt &&
	    i.points[j].point.y > 0 - dt && i.points[j].point.y < 300 + dt) {
	  i.onScreen = true;
	  kick = false;
	}		    
      }
      if (kick && i.onScreen) {
	return false;
      }
      if (i.ticks >= 16500) {
	return false;
      }
      return true;
    });

    while (nextFrame.length < 5) {
      nextFrame.push(random_blob());
    }
    
    for (let i = 0; i < nextFrame.length; i++) {
      for (let j = 0; j < nextFrame[i].points.length; j++) {
	nextFrame[i].points[j].point.x += nextFrame[i].points[j].dir.x;
	nextFrame[i].points[j].point.y += nextFrame[i].points[j].dir.y;
	nextFrame[i].ticks++;
      }
    }
    // console.log("frame" + (tick + 1));
    setBlobs(nextFrame);
    setTimeout(() => {setTick(tick + 1)}, 16);
  }, [tick]);
  
  function rand_point(min = 0, max = 300) {
    let r1 = min + (max-min)* Math.random();
    let r2 = min + (max-min)* Math.random();
    return {
      x: Math.round(r1),
      y: Math.round(r2)
    };
  }

  function random_blob(min = 0, max = 300) {
    let ret = {
      points: [
      ],
      onScreen: false,
      ticks: 0
    };
    let direction = {
      x: 0.1 + (Math.random() - 0.5),
      y: 0.1 + (Math.random() - 0.5)
    }

    let dir_length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

    direction.x /= dir_length;
    direction.y /= dir_length;
    
    for (let j = 0; j < 3; j++) {
      let rand1 = Math.random()
      ret.points.push(
	{
	  point: {
	    x: min + ((max - min) / 2) * Math.random() + direction.x * (min - max) * 3,
	    y: min + ((max - min) / 2) * Math.random() + direction.y * (min - max) * 3
	  },
	  dir: {
	    x: direction.x * (1 + rand1 * 2) + (Math.random() - 0.5) * 0.3,
	    y: direction.y * (1 + rand1 * 2) + (Math.random() - 0.5) * 0.3,
	  }
	}
      )
    }
    return ret;
  }
  
  const rand_points = useMemo(
    () => {
      let ret = [];
      for (let i = 0; i < 3; i++) {
	ret.push(rand_point());
      }
      return ret;
    }, []
  )

  function q_path(arr) {
    let ret = "M " + arr[0][0] + " " + arr[0][1] + " ";
    for (let i = 1; i < arr.length - 1; i++ ) {
      ret += " Q " + arr[i][2] + " " + arr[i][3] + " " + arr[i + 1][0]+ " " + arr[i + 1][1];
    }
    console.log(ret);
    return ret;
  }

  function straight_path(arr) {
    let ret = "M " + arr[0].x + "," + arr[0].y + " ";
    for (let i = 0; i < arr.length; i++) {
      ret += "L " + arr[i].x + "," + arr[i].y + " ";
    }
    ret += "L " + arr[0].x + "," + arr[0].y + " ";
    console.log(ret);
    return ret;
  }

  function control_points(p1, p2) {
    let vec=  {
      x: (p2.x - p1.x),
      y: (p2.y - p1.y)
    };

    let r1 = Math.random() / 4 + 0.75;
    // if (r1 > r2) {
    //     let t = r2;
    //     r2 = r1;
    //     r1 = t;
    // }

    let rp1 = {
      x: vec.x * r1 + p1.x,
      y: vec.y * r1 + p1.y
    }

    let rvec = {
      x: -vec.y / 6,
      y: -vec.x / 6
    }

    let rr1 = Math.random();

    let ret1 = {
      x: rp1.x + rvec.x * rr1,
      y: rp1.y + rvec.y * rr1
    }

    return [ret1];
  }

  const p1 = rand_point();

  // const def_points = rand_points;
  const def_points = [
    {
      x: 74,
      y: 236
    },
    {
      x: 122,
      y: 50
    },
    {
      x: 250,
      y: 230
    },
  ];

  function pr(point){
    return " " + point.x + "," + point.y + " ";
  }
  
  function curve_line(start, end, c1, c2) {
    return "M " + pr(start) + " C " + pr(c1) + pr(c2) + pr(end);	
  }

  function opposite_point(p1, p2)
  {
    return {
      x: 2 * p2.x - p1.x,
      y: 2 * p2.y - p1.y
    }
  }

  function control_point(p1, p2, p3)
  {
    let rand1 = Math.random();

    let rand2 = Math.random();

    rand1 = 1;
    rand2 = 1;
    let vec1 = {
      x: p2.x + (p1.x - p2.x) * (0.25 * rand1 + 0.04),
      y: p2.y + (p1.y - p2.y) * (0.25 * rand1 + 0.04),
    }
    let vec2 = {
      x: (p2.x - p3.x) * (0.25 * rand2 + 0.04),
      y: (p2.y - p3.y) * (0.25 * rand2 + 0.04),
    }
    let vec = {
      x: vec1.x + vec2.x,
      y: vec1.y + vec2.y,
    }
    return vec;
  }

  function complete_dots(arr) {
    let control_dots = [];
    for (let i = 0; i < arr.length; i++) {
      control_dots.push([]);
    }
    for (let i = 0; i < arr.length; i++) {
      let point = control_point(arr[i % 3], arr[(i + 1) % 3], arr[(i + 2) % 3]);
      control_dots[i][1] = point;
      control_dots[(i + 1) % 3][0] = opposite_point(point, arr[(i + 1) % 3]);
    }
    return control_dots;
  }

  function blob_path(inp_arr) {

    let arr = [];
    for (let i = 0; i < inp_arr.length; i++) {
      arr.push(inp_arr[i].point);
    }

    let control_dots = complete_dots(arr);

    
    let ret = "M " + arr[0].x + "," + arr[0].y + " ";
    for (let i = 0; i < arr.length; i++) {
      ret += " C " + pr(control_dots[i][0]) + pr(control_dots[i][1]) + pr(arr[i === arr.length - 1 ? 0 : i + 1]);
    }
    return ret;
  }

  // const smt = opposite_point(rp[1], def_points[1]);
  // const smt2 = opposite_point(rp[0], def_points[0]);
  // console.log(smt);


  
  const comps = useMemo(() => {
    // let c = complete_dots(def_points);
    // let ret = [];	
    // for (let i = 0; i < c.length; i++) {
    //     ret.push(c[i][0]);
    //     ret.push(c[i][1]);	    
    // }
    // return ret;
  }, []);

  const vv1 = control_point(def_points[0], def_points[1], def_points[2]);
  const opv1 = opposite_point(vv1, def_points[1]);
  const fin = complete_dots(def_points);
  
  return <div style={{
    width: "100%",
    height: "100%"
  }}>
	        <svg width="100%" height="100%" viewBox="0 0 300 700" style={{widht: "100%", height: "100%"}}>
		  <defs>
		    <linearGradient id="lightGreen" x1="0" x2="1" y1="0" y2="1">
		      <stop offset="0%" stopColor="#5CCC25"/>
		      <stop offset="20%" stopColor="#E3E339">
			<animate attributeName="offset" values="20%; 25%; 20%" dur="4500ms" fill="freeze" repeatCount="indefinite" />
		      </stop>
		      <stop offset="35%" stopColor="#FCBE42"/>
		      <stop offset="100%" stopColor="#11AD45"/>			   
		    </linearGradient>
		    <linearGradient id="grad2" x1="30%" y1="70%">
		      <stop offset="7.14%" stop-color="#011227">
			<animate attributeName="stop-color" values="#011227; #011D2A; #003933; #004035; #011227;" dur="4500ms" fill="freeze" repeatCount="indefinite" />
		      </stop>
		      <stop offset="35.4%" stop-color="#011D2A">
			<animate attributeName="stop-color" values="#011D2A; #003933; #004035; #011227; #011D2A;" dur="4500ms" fill="freeze" repeatCount="indefinite" />
		      </stop>
		      <stop offset="84.49%" stop-color="#175C09">
			<animate attributeName="stop-color" values="#003933; #004035; #011227; #011D2A; #003933;" dur="4500ms" fill="freeze" repeatCount="indefinite" />
		      </stop>
		      <stop offset="94.62%" stop-color="#004035">
			<animate attributeName="stop-color" values="#004035; #011227; #011D2A; #003933; #004035;" dur="4500ms" fill="freeze" repeatCount="indefinite" />
		      </stop>
		    </linearGradient>
		    <linearGradient id="grad3" x1="30%" y1="70%">
		      <stop offset="7.14%" stop-color="#175C09">
		      </stop>
		      <stop offset="35.4%" stop-color="#0A3D2C">
		      </stop>
		      <stop offset="84.49%" stop-color="#142340">
		      </stop>
		      <stop offset="94.62%" stop-color="#3D1806">
		      </stop>
		    </linearGradient>
		  </defs>
		  <mask id="my_mask">
		    <circle cx="50%" cy="40%" r={150} fill="white">
		      <animate attributeName="r" values="100.0;109.27050983124842;117.6335575687742;124.27050983124843;128.5316954888546;130.0;128.5316954888546;124.27050983124843;117.6335575687742;109.27050983124843;100.0;90.72949016875157;82.3664424312258;75.72949016875158;71.46830451114539;70.0;71.46830451114539;75.72949016875157;82.3664424312258;90.72949016875157;99.99999999999999;" dur="6s" repeatCount="indefinite" />
		    </circle>
		  </mask>
		  <rect x="" y="0" width="400" height="700" fill="url(#grad2)"/>
		  <rect x="0" y="0" width="400" height="700" fill="url(#grad3)" mask="url(#my_mask)"/>
		  {
		    blobs.map ( (i, pos) =>
		      <path d={blob_path(i.points, fin)} fill="url(#lightGreen)" strokeWidth="0" stroke="green" mask="url(#my_mask)"/>
		    )
		  }
	        </svg>

	      </div>
}


// <path d={straight_path(def_points)} fill="none" strokeWidth="1" stroke="red" /> 

// {
//     fin.map ((i, pos) =>
// 	   <>
// 	       <circle cx={i[0].x} cy={i[0].y} r="2" fill="blue" />
// 	       <circle cx={i[1].x} cy={i[1].y} r="2" fill="green" />
// 	   </>
//     )
// }

// <Smile size={350} />



function PopUp({data}) {
  return <div className="popUp" onClick={
    () => {
        window.get_evg_func("hidePopUp")("popUp", "mainThing")
    }
}>
    <div className="back">
    </div>
    <div className="mainThing">
        <div>
            <div style={{ height: "210px" }} />
            {
                data && data.upperText && data.upperText.split("#").map(
                    (i, pos) =>
                        <div key={pos}>
                            {i}
                        </div>
                )
            }
            <div style={{ height: "0px" }} />
            {
                data && data.lowerText && data.lowerText.split("#").map(
                    (i, pos) =>
                        <div key={pos}>
                            {i}
                        </div>
                )
            }
        </div>
        <div className="btns">
            {
                /*data && data.buttons && data.buttons.map((i, pos) =>
                    <div key={pos} className={pos === data.buttons.length - 1 ? "" : "boring"} style={typography.button1} onClick={() => { window.get_evg_func("sendAE")(i.eventName) }}>
                        {i.text}
                    </div>
                )*/
            }
        </div>
        <div style={{ height: "150px" }} />
    </div>
</div>;
  // return <div className="popUp" onClick={
  //   () => {
  //     /* debugger; */
  //     _func("hidePopUp")("popUp", "mainThing")
  //   }
  // }>
  //          <div className="back">
  //          </div>
  //          <div className="mainThing">
  //            <div style={typography.headline3} className="text">
  //              {
  //                data && data.upperText  && data.upperText.split("#").map(
  //                  (i, pos) =>
  //                  <div key={pos}>
  //                    {i}
  //                  </div>
  //                )
  //              }
  //              <div style={{height: "20px"}}/>
  //              {
  //                data && data.lowerText  && data.lowerText.split("#").map(
  //                  (i, pos) =>
  //                  <div style={typography.body2} key={pos}>
  //                    {i}
  //                  </div>
  //                )
  //              }
  //            </div>
  //            <div className="btns">
  //              {
  //                data && data.buttons && data.buttons.map((i, pos) => 
  //                  <div key={pos} className={pos === data.buttons.length - 1 ? "" : "boring"} style={typography.button1} onClick={() => {window.get_evg_func("sendAE")(i.eventName)}}>
  //                    {i.text}
  //                  </div>
  //                )
  //              }
  //            </div>
  //            <div style={{height: "150px"}} />
  //          </div>
  //        </div>;
}


function App() {
  const array_str = default_text;
  const [currStr, setCurrStr] = useState(array_str[0]);
  const [currInd, setCurrInd] = useState(0);
  const [currObject, setCurrObejct] = useState([]);
  const [mode, setMode] = useState("normal");
  const [totObject, setTotObject] = useState([]);
  const [alertItem, setAlertItem] = useState([]);
  const [popUpObject, setPopUpObject] = useState([]);


  function debugModeToggle()
  {
    if (mode === "debug")
      setMode("normal");
    else
      setMode("debug");
  }


  function sendAE(act, stf = {}) {
    window.evg_assistant.sendData({ action: { action_id: act, parameters: stf }});
  }

  function closeApp()
  {
    sendAE("FINAL", {});
    window.evg_assistant.close();
  }

  useEffect(() => {
    window.add_evg_func = add_evg_func;
    window.get_evg_func = get_evg_func;
    window.add_evg_func("sendAE", sendAE);
    window.add_evg_func("closeApp", closeApp);
    window.add_evg_func("showAlert", show_alert);
    window.add_evg_func("showPopUp", showPopUp);
    window.add_evg_func("hidePopUp", hidePopUp);
    window.evg_assistant = initialize(() => window.evg_assistant_state);
  }, []);

  useEffect( () => {
    window.evg_assistant.on("data", (input) => {
      if (input.smart_app_data) {
        // let temp = new Object;
        // Object.assign(temp, input);     
        console.log("info: " + input.smart_app_data);   
        setCurrObejct(input.smart_app_data);
      }
    });
  }, []);


  useEffect( () => {
    let t = new Array();
    Object.assign(t, totObject);
    let t1 = new Object();
    Object.assign(t1, currObject);
    t.push(t1);
    setTotObject(t);

    const complex_func_arr = [
      {
        name: "closeApp",
        func: () => {
          window.get_evg_func("sendAE")("CLOSE_APP");
          window.get_evg_func("closeApp")();
        }
      },
      {
        name: "test",
        func: () => {
          alert("Test func");
        }
      },
      {
        name: "showAlert",
        func: () => {
          setAlertItem({
            upperText: currObject.commandParams.upperText || "",
            lowerText: currObject.commandParams.lowerText || ""
          });
          window.get_evg_func("showAlert")();
        }
      },
      {
        name: "showPopUp",
        func: () => {          
          setPopUpObject(currObject.commandParams);
          window.get_evg_func("showPopUp")("popUp", "mainThing", null);
          console.log('Pop up!');
          const timer = setTimeout(() => {
            window.get_evg_func("hidePopUp")("popUp", "mainThing");
          }, 5000);
        }
      },
      {
        name: "hidePopUp",
        func: () => {          
          // setPopUpObject(currObject.commandParams);
          window.get_evg_func("hidePopUp")("popUp", "mainThing");
        }
      }
    ];


    let complex_func = complex_func_arr.find(
        (i) => (i.name === currObject.commandName));
    
    if (complex_func !== undefined) {
      complex_func.func();
    }
  }, [currObject]);
  
  useEffect (() => {
    let r = currInd;
    if (currInd >= array_str.length - 1)
      r = 0;
    else
      r = currInd + 1;
    setTimeout( () => {	    
      setCurrStr(array_str[r]);
      setCurrInd(r);
      
    }, array_str[currInd].time);
  }, [currInd]);


  if (mode == "debug") {
    let inner = {
    }
    return (
      <>
        <Junk dmt={debugModeToggle} />
        <ModalDebug data={revert_to_old_debug(totObject)} inner={inner}/>
      </>
    );
  }
  
  return (
    <div className="App" style={{width: "100%"}}>
      {/* <Junk dmt={debugModeToggle} /> */}
      <div className="ins" style={{
	backgroundImage: "url(./old_back.svg)",
	// background: "blue"
      }}>
        <div style={{
          position: "fixed",
          left: "1rem",
          right: '0',
          top: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: 'flex-start'
        }}>
          <div style={{marginRight: "10px"}} id="goBack" onClick={
            () => {
              window.get_evg_func("sendAE")("CLOSE_APP");
              window.get_evg_func("closeApp")();
            }
          }>
            <IconChevronLeft size="s" color="black"/>
          </div>
          <div style={{...typography.headline3, margin: "auto", transform: "translateX(-26px)"}}>
           Минута осознанности
          </div>
        </div>
	<div style={typography.body1} className="quote">
	  {
	    currStr.arr.map((i, pos) =>
	      <div key={pos} style={{marginTop: "15px"}}>
		{i}
	      </div>
	    )
	  }
	</div>
      </div>
      <AlertItem upperText={alertItem.upperText || ""} lowerText={alertItem.lowerText || ""}/>
      <PopUp data={popUpObject}/>
    </div>
  );
}

export default App;
