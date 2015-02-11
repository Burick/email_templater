// JavaScript Document

$(document).ready(function() {
	$("#resultsContainer").hide(); //Hiding our results, as we don't need to see them yet!
	$("#story2Div").hide(); //Hiding our second story panel.
	var additionalContentVal = false; //This makes us default to a one-story format.
	var prodAd = false;
    var templateStyle = $('#tmplPick').val();


	//If this is checked, adds the second story box
	$('#additionalContentCheckbox').click(function(){
    if (this.checked) {
		additionalContentVal = true;
        console.log("Checked? "+additionalContentVal);
		$("#story1Div").removeClass("col-lg-12").addClass("col-lg-6");
		$("#story2Div").show( "fade" );
    } else {
		additionalContentVal = false;
		console.log("Checked? "+additionalContentVal);
		$("#story2Div").hide( "fade", function() {
		$("#story1Div").removeClass("col-lg-6").addClass("col-lg-12");
		});
	}
	});

    //**********************
    //BEGIN TEXT HANDLING  *
    //**********************

    function textFix(){
        var inputVal = $.trim($(this).val());
        if(S(inputVal).contains('.stml')) {
            var splitSTML = $.trim($(this).val().split('.stml')[0]); //split the value into two parts of an array.
            $(this).val(splitSTML+".stml");	//re-add the .stml ending
            console.log("Fixed string with stmlCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('.html')) {
            var splitHTML = $.trim($(this).val().split('.html')[0]);
            $(this).val(splitHTML+".html");
            console.log("Fixed string with htmlCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('?utm_source')) {
            var splitUTM = $.trim($(this).val().split('?utm_source')[0]);
            $(this).val(splitUTM);
            console.log("Fixed string with utmCheck"); //Not necessary, just for keeping track
        } else if(S(inputVal).contains('See more at:')) {
            var splitSeeMore = $.trim($(this).val().split(' - See more at:')[0]);
            $(this).val(splitSeeMore);
            console.log("Fixed string with SeeMoreCheck"); //Not necessary, just for keeping track
        }

    }
    //The textFix scrubs links of anything extending past
    // .html | .stml | ?utm_source |  - See more at:
    //Additionally, it strips existing UTM codes away, which is Kelly-proof (hopefully)



    //checks our template style for us, useful when doing keycodes
    function getTemplateStyle(){
            var x = $('#tmplPick').val();
            console.log("getTemplateStyle()"+x);
            if (x === "DB") {
                templateStyle = "DB";
            } else if (x === "MR"){
                templateStyle = "MR";
            } else if (x === "RFAR"){
                templateStyle = "RFAR";
            } else {
                console.log("Error: None of above");
            }
        }

    //checks our product style for us, useful when doing keycodes
    function getProduct(){
        var x = $('#productSelect').val();
        console.log("getProduct() "+x);
        if (x === "") {
            prodAd = false;
        } else if (x === "PW"){
            prodAd = "productXCOM";
        } else if (x === "XCOM"){
            prodAd = "productPW";
        } else {
            console.log("Error: None of above");
        }
    }

    //****************************************************************
    //
    //BEGIN POST-BUTTON CLICK ACTIONS
    //
    //****************************************************************
	$("#generateHTML").click(function(){
		var storyz;
        event.preventDefault(); //Stops page from reloading
        if($("#title1").val() === "") {
            alert("Please enter a story");
        } else {
            getTemplateStyle(); //Start by finding out which template we're using
            getProduct(); //and which Product we're pitching (if any)
            $('#story1Form').find('input').each(textFix);
            var title1 = $.trim($("#title1").val());
            var title1text = $.trim($("#title1text").val());
            var title1URL = $.trim($("#title1URL").val());
            var title1IMG = $.trim($("#title1IMG").val());
            var title1KEY = $.trim($("#title1KEY").val());
            var urlInsert1 = '<a href="' + title1URL + '" target="_blank">';
            var linkedTitle1 = '<h4><a href="' + title1URL + '" target="_blank">' + title1 + '</a></h4>';
            var imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';


            if(templateStyle === "RFAR"){
                var utmsource = '?utm_source='+title1KEY+'&keycode='+title1KEY+'&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]';
                var safeSend = '<a href="http://www.independentlivingnews.com/il/whitelisting.php'+utmsource+'" linkname="safe sender" target="_blank">Add as Safe Sender</a>';
                var rfarHeader = '<a href="http://www.independentlivingnews.com/preppers'+utmsource+'" linkname="Todays Headlines" target="new"><img alt="Lee Bellingers Ready For Anything Report" border="0" height="122" src="http://www.independentlivingnews.com/email/images/iln_lb_ready-for-anything_header.jpg" style="display:block;" width="602" /></a>';
                var subILN = '<a href="http://www.survivalproshop.com/publications/subscription-to-independent-living-newsletter.html'+utmsource+'" target="_blank">';
                //for subILN, prefLink, unsubLink, remember to close with </a>
                var prefLink = '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k='+title1KEY+'-P" linkname="Email Preferences">';
                var unsubLink = '<a href="http://www.independentlivingnews.com/email/preferences/?u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]&amp;k='+title1KEY+'-U" linkname="Bottom Unsubscribe">';
                title1URL += utmsource; //appends our URL with a tracking code
                urlInsert1 = '<a href="' + title1URL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
                imageRetrieve1 = '<center>' + urlInsert1 + '<img src="' + title1IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';


                //product values, should move these later
                var link_XCOM = '<a href="http://www.survivalproshop.com/extreme-weather-combo-30-day-maximum-shelf-life-food-reserve.html'+utmsource+'" target="_blank">';
                var link_PW = '<a href="http://www.independentlivingnews.com/video/pw-vsl.php'+utmsource+'" target="_blank">';
                if(prodAd === false){
                    console.log("No product found");
                } else if(prodAd === "productXCOM"){
                    prodLink = link_XCOM;
                    console.log("prodLink: " + prodLink);
                } else if(prodAd === "productPW"){
                    prodLink = link_PW;
                    console.log("prodLink: " + prodLink);
            }
        }
		
		//TODO add keycode generator, keycode integration with links
        //TODO add modularity for ads... not sure how possible this is yet, unless i grab a diff version of main Tmpl each time?

		//This Object/Array is used with JSRender. 
		//The template will iterate over the contained "story" array
		//and spit out as many stories as we have objects in the array.
        storyz = {
            story: [
                {
                    title: title1,
                    text: title1text,
                    url: title1URL,
                    imageURL: title1IMG,
                    urlInsert: urlInsert1,
                    linkedTitle: linkedTitle1,
                    insertImage: imageRetrieve1
                }],
            productAd: prodAd,
            safeSend: safeSend,
            rfarHeader: rfarHeader,
            subILN: subILN,
            prefLink: prefLink,
            unsubLink: unsubLink,
            prodLink: prodLink
        };
		
		if(additionalContentVal === true) {
			var title2 = $.trim($("#title2").val());
			var title2text = $.trim($("#title2text").val());
			var title2URL = $.trim($("#title2URL").val());
			var title2IMG = $.trim($("#title2IMG").val());
			var urlInsert2 = '<a href="'+title2URL+'" target="_blank">';
			var linkedTitle2 = '<h4><a href="'+title2URL+'" target="_blank">'+title2+'</a></h4>';
			var imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';
			console.log("Additional content enabled, vars set");

            if(templateStyle === "RFAR"){
                title2URL += utmsource; //appends our URL with a tracking code
                urlInsert2 = '<a href="' + title2URL + '" target="_blank">'; //updates urlInsert with the new utm-appended keycode
                imageRetrieve2 = '<center>' + urlInsert2 + '<img src="' + title2IMG + '" style="max-height: 125px; max-width: 125px;" alt="Story Image"></a></center>';
            }
			
			//constructor for story
			var storyTwo = {
				title: title2,
				text: title2text,
				url: title2URL,
				imageURL: title2IMG,
				urlInsert: urlInsert2,
				linkedTitle: linkedTitle2,
				insertImage: imageRetrieve2
				};
			storyz.story.push(storyTwo);
        }

        function spawnDB() {
            function getDB() {
               return $.get("http://daviseford.com/sites/default/files/email_templater/txt/db_Tmpl.txt", function (value) {
                    db_Tmpl = $.templates(value);
                });
            }
            $.when(
                getDB()
            ).then(function () {
                    $.templates(db_addDiv, db_Tmpl); //adds db_addDiv as a subtemplate of db_Tmpl
                    console.log("fire after requests succeed");
                   // db_addDiv = $.templates("#db_addDiv"); //Want to move this to external
                    //$.templates(db_addDiv, db_Tmpl); //adds db_addDiv as a subtemplate of db_Tmpl
                    html = db_Tmpl.render(storyz);
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                }).fail(function () {
                    console.log("something went wrong!");
                });
        }
        //spawnDB();

        function spawnMR() {
            function getMR() {
                return $.get("http://daviseford.com/sites/default/files/email_templater/txt/mr_Tmpl.txt", function (value) {
                    mr_Tmpl = $.templates(value);
                });
            }
            $.when(
                getMR()
            ).then(function () {
                    $.templates(db_addDiv, mr_Tmpl); //adds db_addDiv as a subtemplate of mr_Tmpl
                    console.log("fire after requests succeed");
                    html = mr_Tmpl.render(storyz);
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                }).fail(function () {
                    console.log("something went wrong!");
                });
        }
        //spawnMR();

        function spawnRFAR() {
            function getRFAR() {
                return $.get("http://daviseford.com/sites/default/files/email_templater/txt/rfar_Tmpl.txt", function (value) {
                    rfar_Tmpl = $.templates(value);
                });
            }
            $.when(
                getRFAR()
            ).then(function () {
                    $.templates(rfar_addDiv, rfar_Tmpl); //adds rfar_addDiv as a subtemplate of rfar_Tmpl
                    product1 = $.templates("#product1");
                    console.log("fire after requests succeed");
                    html = rfar_Tmpl.render(storyz);
                    $("#resultsTextArea").val(html); //Puts the raw HTML into the textbox so we can easily copy it.
                    $("#resultsDiv").html(html); //Renders the HTML version of the email
                }).fail(function () {
                    console.log("something went wrong!");
                });
        }
        //spawnRFAR();


        //getResults() is responsible for reading the template selection box
        //and spawning the correct template
        //will probably be revised in the future, as it's a bit hacky and inelegant
        function getResults(){
            var x = $('#tmplPick').val();
            console.log(x);
            if (x === "DB") {
                spawnDB();
                console.log("Spawned DB");
            } else if (x === "MR"){
                spawnMR();
                console.log("Spawned MR");
            } else if (x === "RFAR"){
                spawnRFAR();
                console.log("Spawned RFAR");
            } else {
                console.log("Error: Didn't spawn anything");
            }
        }
        getResults();

	$("#resultsContainer").show("drop"); //Shows the results once everything is ready.
        }}
        )
    });