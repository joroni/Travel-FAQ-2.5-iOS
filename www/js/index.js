/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 /**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     modified OOB file from phonegap project
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/
 
var app = {
    // Application Constructor	
	
    initialize: function() {		
        this.bindEvents();   
		$.support.cors = true;
		$.mobile.allowCrossDomainPages = true;
		appUI.initialize();
			console.log('INITIALIZING APP...');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {   
		if (isDesktop()) {
			$(document).ready(function(e) {
				app.onDeviceReady();
			
            });
		}
		
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('menubutton', function() { appUI.slideOptions();}, false);				
		document.addEventListener('searchbutton', function() { appUI.slideCountries(); }, false);
		window.addEventListener('resize', function() {appUI.resizeContent(); appUI.resizeCountryList();},false);
		window.addEventListener('orientationchange', function() {appUI.arrangeScreenLayout();},false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
		


	onDeviceReady: function() {	
		document.addEventListener("online", 
		function() {
			D('Connection established.');
			console.log('STARTING APP...');

			$.loadingSpinner();
			    navigator.splashscreen.hide();
    StatusBar.styleLightContent();
			appUI.checkUpdate();
		},
		false);
			
		if (window.requestFileSystem) {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
				function(fs) {
					var pf = "Android";
					try {
						pf = device ? device.platform : null;				
					} catch(err) {}	
										
					
					config.fileSystemRootFolder = fs.root.toURL();
					if (pf=="Android") config.fileSystemRootFolder = cordova.file.externalApplicationStorageDirectory;
				});	
		}		
		
		//bind alert to dialogs plugin
		if (navigator.notification) {
			window.alert = function(msg) {
				navigator.notification.alert(
					msg,  // message
					function() {},         // callback
					config.appTitle,            // title
					'OK'                  // buttonName
				);			
			}
		}
		
		//appUI.launchFirstScreen();
		appUI.setUserScreen();		
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },
	

};




	
(function($){
    // Retain count concept: http://stackoverflow.com/a/2420247/260665
    // Callers should make sure that for every invocation of loadingSpinner method there has to be an equivalent invocation of removeLoadingSpinner
    var retainCount = 0;

    // http://stackoverflow.com/a/13992290/260665 difference between $.fn.extend and $.extend
    $.extend({
        loadingSpinner: function() {
            // add the overlay with loading image to the page
            var over = '<div id="custom-loading-overlay">' +
                '<i id="custom-loading" class="fa fa-spinner fa-spin fa-3x fa-fw" style="font-size:48px; color: #470A68;"></i>'+
                'LOADING</div>';
            if (0===retainCount) {
                $(over).appendTo('body');
            }
            retainCount++;
        },
        removeLoadingSpinner: function() {
            retainCount--;
            if (retainCount<=0) {
                $('#custom-loading-overlay').remove();
                retainCount = 0;
            }
        }
    });
}(jQuery)); 




//$.removeLoadingSpinner();
