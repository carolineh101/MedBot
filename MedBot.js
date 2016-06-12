/** This is a sample code for your bot**/
	    function MessageHandler(context, event) {
	        context.console.log("test");
	        if (event.message.includes("new med")) {
	            var med = event.message.replace("new med ", "");
	            context.simpledb.roomleveldata.med = med;
	            context.sendResponse("At what time do you want to take " + med + "?");
	        } else if (event.message.includes(":")) {
	            var time = event.message.split(":");
	            var aftercolon = time[1].split(" ");
	            var mins = parseInt(aftercolon[0]);
	            var hours = parseInt(time[0]);
	            if (aftercolon[1].includes("pm")) {
	                if (hours < 12) {
	                    hours = hours + 12;
	                }
	            } else if (hours == 12) {
	                hours = 0;
	            }
	            context.simpledb.roomleveldata.hours = hours.toString();
	            context.simpledb.roomleveldata.mins = mins.toString();
	            var date = new Date();
	            var currentHours = date.getHours();
	            var currentMins = date.getMinutes();
	            var hoursUntil;
	            var minsUntil;
	            if (hours >= currentHours) {
	                hoursUntil = hours - currentHours;
	            } else {
	                hoursUntil = hours + 24 - currentHours;
	            }
	            if (mins >= currentMins) {
	                minsUntil = mins - currentMins;
	            } else {
	                minsUntil = mins + 60 - currentMins;
	                hoursUntil -= 1;
	            }
	            context.sendResponse("Okay, let's get started! Your next dose is in " + hoursUntil + " hours and " + minsUntil + " minutes.");
	            context.sendResponse("Check to see how much time you have left by typing in 'check'.")
	            context.sendResponse("You can end your medication at any time by typing in 'end " + context.simpledb.roomleveldata.med + "'.")
	        } else if (event.message == "end " + context.simpledb.roomleveldata.med) {
	            context.sendResponse("Got it!")
	            context.simpledb.roomleveldata.med = "";
	            context.simpledb.roomleveldata.hours = "";
	            context.simpledb.roomleveldata.mins = "";
	        } else if (event.message == "check") {
	            var theDate = new Date();
	            var thecurrentHours = theDate.getHours();
	            var thecurrentMins = theDate.getMinutes();
	            var thehoursUntil;
	            var theminsUntil;
	            if (parseInt(context.simpledb.roomleveldata.hours) >= thecurrentHours) {
	                thehoursUntil = parseInt(context.simpledb.roomleveldata.hours) - thecurrentHours;
	            } else {
	                thehoursUntil = parseInt(context.simpledb.roomleveldata.hours) + 24 - thecurrentHours;
	            }
	            if (parseInt(context.simpledb.roomleveldata.mins) >= thecurrentMins) {
	                theminsUntil = parseInt(context.simpledb.roomleveldata.mins) - thecurrentMins;
	            } else {
	                theminsUntil = parseInt(context.simpledb.roomleveldata.mins) + 60 - thecurrentMins;
	                thehoursUntil -= 1;
	            }
	            context.sendResponse("Your next dose is in " + thehoursUntil + " hours and " + theminsUntil + " minutes.");
	        } else {
	            context.sendResponse("Sorry, I didn't quite understand that.");
	        }
	    }
	    /** Functions declared below are required **/
	    function EventHandler(context, event) {
	        if (!context.simpledb.roomleveldata.numinstance) {
	            context.simpledb.roomleveldata.numinstance = 0;
	            context.sendResponse("Hi, I'm MedBot! I'll help you keep track of your medications. Add a medication by typing in 'new med' followed by its name!");
	        }
	    }
	
	    function HttpResponseHandler(context, event) {
	        //nothing
	    }
	
	    function DbGetHandler(context, event) {
	        context.sendResponse("testdbput keyword was last get by:" + event.dbval);
	    }
	
	    function DbPutHandler(context, event) {
	        context.sendResponse("testdbput keyword was last put by:" + event.dbval);
	    }