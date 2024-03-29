function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
    	window.onload=func;
    }else{
    	window.onload=function(){
    		oldonload();
    	func();
        }    	
    }
}


function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


 function addClass(element,value){
 	if(!element.className){
 		element.className=value;
 	}else{
 		newClassName=element.className;
 		newClassName+='';
 		newClassName+=value;
 		element.className=newClassName;
 	}
 }


function hightlightPage(href){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName('header');
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName('nav');
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		linkurl=links[i].getAttribute('href');
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className='here';
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id',linktext);
		}
	};
}
addLoadEvent(hightlightPage);


function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left='0px';
	}
	if(!elem.style.top){
		elem.style.top='0px';
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if (xpos<final_x) {
		xpos++;
	};
	if (xpos>final_x) {
		xpos--;
	};
	if (ypos<final_y) {
		ypos++;
	};
	if (ypos>final_y) {
		ypos--;
	};
	elem.style.left=xpos+'px';
	elem.style.top=ypos+'px';
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")"
	movement=setTimeout(repeat,interval);
}


function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('intro')) return false;
	var intro=document.getElementById('intro');
	var slideshow=document.createElement('div');
	slideshow.setAttribute('id','slideshow');
	var preview=document.createElement('img');
	preview.setAttribute('src','images/slideshow.gif');
	preview.setAttribute('alt','a goipse');
	preview.setAttribute('id','preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links=document.getElementsByTagName('a');
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute('href');
			if(destination.indexOf('index.html')!=-1){
				moveElement('preview',0,0,5);
			}
			if(destination.indexOf('about.html')!=-1){
				moveElement('preview',-150,0,5);
			}
			if(destination.indexOf('photos.html')!=-1){
				moveElement('preview',-300,0,5);
			}
			if(destination.indexOf('live.html')!=-1){
				moveElement('preview',-450,0,5);
			}
			if(destination.indexOf('contact.html')!=-1){
				moveElement('preview',-600,0,5);
			}
		}
	}
}



addLoadEvent(prepareSlideshow);


function showSection(id){
	var sections=document.getElementsByTagName('section');
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute('id')!=id){
			sections[i].style.display='none';
		}else{
			sections[i].style.display='block';
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName('article');
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName('nav');
	if(navs.length==0)return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute('href').split('#')[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display='none';
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}


addLoadEvent(prepareInternalnav);




function showPic(whichpic){
	if(!document.getElementById('placeholder')) return false;
	var placeholder=document.getElementById('placeholder');
	var source=whichpic.getAttribute('href');
	if(!document.getElementById('description')) return false;
	placeholder.setAttribute('src',source);
	if(whichpic.getAttribute('title')){		
	    var text=whichpic.getAttribute('title');
	}else{
        var text='';
	}	
	var description=document.getElementById('description');   
	if(description.firstChild.nodeType==3){
	    description.firstChild.nodeValue=text;	    
	}
    return false;	
}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('aimagegallery')) return false;
	var placeholder=document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','images/placeholder.gif');
	placeholder.setAttribute('alt','my image gallery');
	var description=document.createElement('p');
	description.setAttribute('id','description');
	var desctext=document.createTextNode('Choose an image');
	description.appendChild(desctext);
	var gallery=document.getElementById('aimagegallery');
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}


function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('aimagegallery')) return false;
	var gallery=document.getElementById('aimagegallery');
	var links=gallery.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);



function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName('table');
	var odd,rows;
	for (var i=0;i<tables.length;i++){
		odd=false;
		rows=tables[i].getElementsByTagName('tr');
		for (var j=0;j<rows.length;j++) {
			if (odd==true) {
				rows[j].style.backgroundColor='#ffc';
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassname=rows[i].className;
		rows[i].onmouseover=function (){
			addClass(this,'heightlight');
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassname;
		}
	};
}

function displayAbbreviations(){
	if (!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	var abbreviations=document.getElementsByTagName('abbr');
	if(abbreviations.length<1) return false;
	var defs=new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;
		var definition=current_abbr.getAttribute('title');
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definition;
	}
	var dlist=document.createElement('dl');
	for(key in defs){
		var definition=defs[key];
		var dtitle=document.createElement('dt');
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement('dd');
		var ddesc_text=document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);        
	}
	if(dlist.childNodes.length<1) return false;
	var header=document.createElement('h3');
	var header_text=document.createTextNode('Abbreviations');
	header.appendChild(header_text);
	var articles=document.getElementsByTagName('article');
	if(articles.length==0) return false;
	var container=articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);


function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName('label');
	for (var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute('for')) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute('for');
			if(!document.getElementById(id)) return false;
			var element=document.getElementById(id);
			element.focus();
		}
	};
}
addLoadEvent(focusLabels);





























































































































