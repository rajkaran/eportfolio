define(["jquery", "bootstrap"],function ($, boostrap) {
    
	var SELF;
	
    return{
		checkBrowser:function(){
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
			
			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
				return 'IE '+(tem[1]||'');
			} 
			
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return 'Opera '+tem[1];}
			}  
			
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			
			return {
				name: M[0],
				version: M[1]
			};			
		},
		
		isValid : function(){
			
			var result = false;
			
			var browser = this.checkBrowser();
			
			switch(browser.name){
				case 'opera':
					if(browser.version >= 9 )result = true;
					break;
			
				case 'Chrome':
					if(browser.version >= 40 )result = true;
					break;
					
				case 'safari':
					if(browser.version >= 3.2 )result = true;
					break;
					
				case 'firefox':
					if(browser.version >= 30 )result = true;
					break;
					
				case 'MSIE':
					if(browser.version >= 9 )result = true;
					break;					
			}
			
			return result;
			
		},
		
		showModel : function(){
			$('#myModal').modal('show');
		},
	
	
	
	
	
	}
	
});
