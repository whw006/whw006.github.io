$(document).ready(function() {
	console.log("Risk V2.1")
	  $("input").change(function(){
		omega();
	  });

	  $("*").click(function(){
		omega();
	  });

	  // Section 1 is minmum;

	  // Force selection

	  $(".ACETopicBtn").click(function() {
		window.open("https://www.rtog.org/LinkClick.aspx?fileticket=oClaTCMufRA%3D&tabid=290", '_blank');
	  });

	  function getACE() {
		var ACEVal;
		$( ".ACERadioVal" ).each(function( index , value ) {
		  if($(this).prop('checked')) {
			if (index === 4) {
			  ACEVal = 9;
			} else {
			  ACEVal = index;
			}
		  }
		});
		return ACEVal;
	  }

	  $(".CIRSTopicBtn").click(function() {
		$(this).closest(".CIRSTopic").find(".helpDiv").slideToggle( "fast", function() {});
	  });

	  function calculateCIRS(){
		var CIRSVal = 0;
		$( ".CIRSRadioVal" ).each(function( index , value ) {
		  if($(this).prop('checked')) {
			CIRSVal += index % 5;
		  }
		});
		return CIRSVal;
	  }

	  // function displayhelpDiv(type) {
	  //   console.log(type);
	  //
	  //   if (type === "heart") {
	  //
	  //     console.log('here');
	  //
	  //     $( "#heartHelp" ).slideToggle( "fast", function() {});
	  //    }
	  //
	  //
	  // }

	var deets_in =''
	var deets_out =''

	  function omega(){

	// Make a Running string to output
	var deets_in =''
	var deets_out =''

		// Calculates R
		var age = parseFloat(document.getElementById('age').value);
		var R = -.391 * ( age - 59.3) / 10.07
		deets_in += '*** Omega score Inputs ***' + '\n'
		deets_in += 'age:' + age + '\n'

		// BMI calc start
		var wt = parseFloat(document.getElementById('weight').value)
		var ht = parseFloat(document.getElementById('height').value)

		// Unit Conversion
		var w_unit = document.getElementById('w_unit').value;
		var h_unit = document.getElementById('h_unit').value;

		if (w_unit == 1) {wt /= 2.20462262};
		if (h_unit == 1) {ht *= 2.54};

		//BMI calc end

		var bmi = wt/Math.pow((ht / 100 ), 2);
		var BMI_int = 1

			if (bmi < 20) {
			BMI_int = 0
		}
		bmi = Math.round(bmi*100) / 100


		deets_in += 'bmi:' + bmi + '\n'

		//goheres

		var sex = document.getElementById('sex_unit').value;

		if (sex == 1 ) {
		   deets_in += 'Gender: Female' + '\n'
		 }
	if (sex == 0) {
	  deets_in += 'Gender: Male' + '\n'
	  }
	var R = R + 0.052 * ((sex - 0.174) / 379);
		// var sex = document.querySelector('input[name="sex"]:checked').value;
		// var sex = document.getElementById('sex').value;

		var ecog = document.getElementById('ECOG').value;

	  var ecog_int = 0

		if (ecog == 0) {
		  var ecog_1 = 0
		  var ecog_2 = 0
		  deets_in += 'ECOG: 0' + '\n'
		}
		if (ecog == 1 ) {
		  var ecog_1 = 1
		  var ecog_2 = 0
		  deets_in += 'ECOG: 1' + '\n'
		}
		if (ecog == 2) {
		  var ecog_1 = 0
		  var ecog_2 = 1
			deets_in += 'ECOG: 2+' + '\n'
		  }


		var R = R - 0.099 * ((ecog_1 - 0.337) / 0.473) - 0.078*((ecog_2 - 0.0485)/0.215)  ;

		// R based on tumor primary location
		var loc = document.getElementById('site').value;

		if (loc == 0) {
		  deets_in += 'Primary site: Hypopharynx or UKP' + '\n'
		  var lnx = 0
		  var oc = 0
		  var ophnx = 0
		  }

		if (loc == 1) {
			deets_in += 'Primary site: Larynx' + '\n'
			var lnx = 1
			var oc = 0
			var ophnx = 0
			}
		if (loc == 2) {
			  deets_in += 'Primary site: Oral Cavity' + '\n'
			  var lnx = 0
			  var oc = 1
			  var ophnx = 0
			  }
		if (loc == 3) {
				  deets_in += 'Primary site: Oropharynx' + '\n'
				  var lnx = 0
				  var oc = 0
				  var ophnx = 1
				  }



		var R = R + 0.198*((oc-0.128)/0.334) - 0.001*((ophnx - 0.435)/0.496) - 0.087 * ((lnx-0.335)/0.472)

		// R based on N stage
		var nstage = document.getElementById('nstage').value;
		if (nstage == 0) {
		  deets_in += 'AJCC 8th N stage: N0' + '\n'
		  var n1 = 0
		  var n2 = 0
		  var n3 = 0
		  }
		if (nstage == 1) {
		  deets_in += 'AJCC 8th N stage: N1' + '\n'
		  var n1 = 1
		  var n2 = 0
		  var n3 = 0
		  }
		if (nstage == 2) {
		  deets_in += 'AJCC 8th N stage: N2' + '\n'
		  var n1 = 0
		  var n2 = 1
		  var n3 = 0
		  }
		if (nstage == 3) {
		  deets_in += 'AJCC 8th N stage: N3' + '\n'
		  var n1 = 0
		  var n2 = 0
		  var n3 = 1
		  }

		var R = R + 0.063*((n1-0.168)/.374) + 0.166*((n2-0.307)/0.461) + 0.113*((n3-0.077)/0.266);

		// T based on N stage
		var tstage = document.getElementById('tstage').value;
		if (tstage == 0) {
		  deets_in += 'AJCC 8th T stage: 0-1' + '\n'
		  var t2 = 0
		  var t3 = 0
		  var t4 = 0
		  }
		if (tstage == 1) {
		  deets_in += 'AJCC 8th T stage: 2' + '\n'
		  var t2 = 1
		  var t3 = 0
		  var t4 = 0
		  }
		if (tstage == 2) {
		  deets_in += 'AJCC 8th T stage: 3' + '\n'
		  var t2 = 0
		  var t3 = 1
		  var t4 = 0
		  }
		if (tstage == 3) {
		  deets_in += 'AJCC 8th T stage: 4' + '\n'
		  var t2 = 0
		  var t3 = 0
		  var t4 = 1
		  }

		var R = R + 0.132*((t2-0.307)/0.461) + 0.132*((t3 - 0.331)/0.471) + 0.169 * ((t4 - 0.252)/0.434);


		// p16
		var p16 = document.getElementById('p16').value;
		if (p16 == 1) {
		  deets_in += 'p16: Positive' + '\n'
		  }
		  else {
			deets_in += 'p16: Negative' + '\n'
		  }
		R = R - 0.086 * ((p16 - 0.0553) / 0.229);


		// Smoking
		var smoke = document.getElementById('smk').value;
		if (smoke == 1) {
		  deets_in += 'Current Smoker' + '\n'
		  }
		  else {
			deets_in += 'Not a Current Smoker' + '\n'
		  }
		R = R - 0.028 * ((smoke - 0.303) / 0.460);

		var tob = document.getElementById('tob').value;
		if (tob == 1) {
		  deets_in += '>= 10 pack year history' + '\n'
		  }
		  else {
			deets_in += '< 10 pack year history' + '\n'
		  }
		R = R - 0.039 * ((tob - 0.232) / 0.422);


		//  // Calculates omega from Risk score


		var w = Math.exp(R);

		var wp = w*5.24 / (w*5.24 + 1);

		// rounds omega to nearest to 2 decimels
		var wp = Math.round(wp * 100) / 100;

		// Age Output
		document.getElementById("AGE1").innerHTML = age;
		document.getElementById("AGE2").innerHTML = age;

		// If there is insufficient input an error message is created
		// if (!wb) {
		// document.getElementById("prompt1").innerHTML = "There is insufficient information to calculate the Ď‰ score";
		//   }
		//  else {
		// Outputs to index.html
		// document.getElementById("prompt1").innerHTML = "GCE Ď‰ score (blind to race and gender): ";
		document.getElementById("omega_out").innerHTML = wp;

	  // Output autofilled info for GCE model
	$("#age_gce").text(age)
	$("#ECOG_gce").text(ecog)
	$("#BMI_gce").text(bmi)

		// document.getElementById("prompt2").innerHTML = "GCE Ď‰ score (w/ race and gender): ";
		// document.getElementById("omega2_out").innerHTML = wp;
		// }

		// // CARG scoring Tool //
		// // calculates GFR IN mL/min based on Cockcroft model which is different than the Jeliffe formula used in CARG paper
		//
		// var gndr = 1;
		// if (sex == 1) gndr = 0.85;
		//
		var cr = parseFloat(document.getElementById('cr').value);
		//
		// var gfr = (gndr * (140 - age)) * wt / 72 / cr;
		// var gfr = Math.round(gfr * 100) / 100

		// Jeliffe model taken from CARG website
	var we = 0;
	//male
	if (sex == 0) {
		we = 50;
		//female
	} else if (sex == 1) {
		we = 45.5;
	}

	// Calculates ideal body weight
	var ibw = we + 2.3*(ht * 0.3937 - 60);

	//Body Surface Area (BSA) = (ideal body weight (kg)^0.425) &times; (height (cm)^0.725) &times; 0.007184
	var bodySA = Math.pow(ibw, 0.425) * Math.pow(ht, 0.725) * 0.007184;

	//Male ((9.8-0.8(age-20)) X(BSA/1.73))/serum creatinine
	//Female((9.8-0.8(age-20)) X 0.9 X (BSA/1.73))/serum creatinine
	var ccl = parseFloat(0);
	if (sex == 0) {
	  ccl = ((98 - (0.8 * (age - 20))) * (bodySA / 1.73)) / cr;
	  ccl = Math.round(ccl*10) / 10;

	} else {
	  ccl = ((98 - (0.8 * (age - 20))) * 0.9 * (bodySA / 1.73)) / cr;
	ccl = Math.round(ccl*10) / 10;
	}

	// Cockroft-Gault formula
	if (sex == 1){
	var CGF = 0.85*(140-age) / cr * wt / 72
	}
	else if (sex ==0){
	  var CGF = (140-age) / cr * wt / 72
	}
	CGF = Math.round(CGF*10) / 10;


	deets_in += 'Cr Clearance (Jeliffe):' + ccl + '\n'
	deets_in += 'Cr Clearance (Cockroft-Gault):' + CGF + '\n' + '\n'

		if (!ccl) {
		  document.getElementById("CRC1").innerHTML = "Invalid Inputs";
		  // document.getElementById("CRC2").innerHTML = "Invalid Inputs";
		} else {
		  document.getElementById("CRC1").innerHTML = ccl;
		  document.getElementById("CRC2").innerHTML = ccl;
		  document.getElementById("CRC3").innerHTML = CGF;

		}
		// BMI output
		if (!bmi) {
		  document.getElementById("BMI1").innerHTML = "Invalid Inputs";
		  //  document.getElementById("BMI2").innerHTML = "Invalid Inputs";
		} else {
		  document.getElementById("BMI1").innerHTML = bmi;
		  // document.getElementById("BMI2").innerHTML = bmi;
		}

		// Calculates G8 Score //
		var food = parseFloat( document.getElementById('Food').value);
		var wl = parseFloat( document.getElementById('WL').value);
		var mob = parseFloat(document.getElementById('Mob').value);
		var psy = parseFloat(document.getElementById('Psy').value);
		var rx = parseFloat(document.getElementById('Rx').value);
		var self = parseFloat(document.getElementById('Self').value);

		var g8age = 0;
		if (age <= 85 && age >= 80) g8age = 1;
		if (age < 80) g8age = 2;

		var g8BMI = 0;
		if (bmi < 21 && bmi >= 19) g8BMI = 1;
		if (bmi < 23 && bmi >= 21) g8BMI = 2;
		if (bmi >= 23) g8BMI = 3;

		var g8 = food + wl + mob + psy + rx + self + g8age + g8BMI;
	  //  Populate G8 input for pdf//
	  deets_in += '*** G8 Input ***' + '\n'
	  deets_in += 'Decline in food  score:' + food + '\n'
	  deets_in += 'Weight loss score:' + wl + '\n'
	  deets_in += 'Mobility  score:' + mob + '\n'
	  deets_in += 'Psychiatric  score:' + mob + '\n'
	  deets_in += 'Prescription  score:' + rx + '\n'
	  deets_in += 'Self rating of health score:' + self + '\n'
	  deets_in += 'Age  score:' + g8age + '\n'
	  deets_in += 'Prescription  score:' + g8BMI + '\n' + '\n' + '\n'


		// Outputs G8 Score //
		document.getElementById("G8Score").innerHTML =g8;
	/////////////////////////////////////////////////////////////


		// Charlson scoring + add to string//////////
		deets_in += "***Charlson input***" + '\n';
		deets_in += "Charlson inputs selected: ";
		var Charlson = 0
		if (document.getElementById("MI").checked){ Charlson += 1;
	deets_in += 'MI, '
		}
		if (document.getElementById("HF").checked) { Charlson += 1;
		  deets_in +='Heart Failure, '
		}
		if (document.getElementById("PVD").checked){ Charlson += 1;
		  deets_in += 'Periph Vasc Dz, '
		}
		if (document.getElementById("CVD").checked) { Charlson += 1;
		  deets_in += 'CVA/TIA, '

		}
		if (document.getElementById("Dem").checked) { Charlson += 1;
		  deets_in += 'Dementia, '

		}
		if (document.getElementById("CPD").checked) { Charlson += 1;
		  deets_in += 'Chronic Lung Dz, '

		}
		if (document.getElementById("CTD").checked) {Charlson += 1;
		  deets_in += 'Conn Tiss Dz, '
		}
		if (document.getElementById("UD").checked) {Charlson += 1;
		  deets_in += 'Ulcer, '
		}
		if (document.getElementById("MLD").checked) {Charlson += 1;
		  deets_in += 'Mild Liver Dz, '
		}
		if (document.getElementById("DM").checked  && !document.getElementById("DMend").checked){ Charlson += 1;
		  deets_in += 'DM, '
		}
		if (document.getElementById("HEMI").checked) {Charlson += 2;
		  deets_in += 'Hemiplegia, '
		}
		if (document.getElementById("ModRenal").checked) {Charlson += 2;
		  deets_in += 'Mod Ren Dz, '
		}
		if (document.getElementById("DMend").checked) { Charlson += 2;
		  deets_in += 'DM w/ end org, '
		}
		if (document.getElementById("ModLD").checked){ Charlson += 3;
		  deets_in += 'Mod+ Liver Dz, '
		}
		if (document.getElementById("AIDS").checked) {Charlson += 6;
		deets_in += 'AIDS, '
		}
	//Adds Charlson to deets_in


	///////////////////////////////////////////////
	deets_in += '\n' + '\n' + '*** CARG Inputs ***' +'\n'
	deets_in += 'CARG Criteria Met: '

		var CARG = 0;
		if (ccl < 34) {CARG = 3;
		deets_in += 'Cr Cl < 34, '
		}

		// Adds up CARG values and adds to String
		if (age >= 72) {CARG += 2;
		  deets_in += 'Age >=72, '
		}
		if (document.getElementById("anemia").checked) { CARG += 3;
		  deets_in += 'Anemia, '
		}
		if (document.getElementById("fall").checked) { CARG += 3;
		  deets_in += 'Falls, '
		}
		if (document.getElementById("hear").checked) { CARG += 2;
		  deets_in += 'Hearing prob, '
	  }
		if (document.getElementById("walk").checked) {CARG += 2;
		  deets_in += 'Walking prob, '
		}
		if (document.getElementById("meds").checked) {CARG += 1;
		  deets_in += 'Meds difficulty, '
		}
		if (document.getElementById("soc").checked) {CARG += 1;
			deets_in += 'decreased soc, '
		}
		var pCARG = 100 / (1+ Math.exp (2.055 - CARG * 0.3002));

		// // Outputs CARG to index.html
		// document.getElementById("promptCARG").innerHTML = "CARG score: ";
		document.getElementById("CARG_out").innerHTML = "<div class = 'medtxt'>" + Math.round(pCARG) + "%" +"<small>" + "(" + CARG + ")" + "</small>"+ "</div>";
		// document.getElementById("promptpCARG").innerHTML = "Risk of chemotherapy toxicity:";
		// document.getElementById("pCARG_out").innerHTML = Math.round(pCARG);
		// document.getElementById("CARG%").innerHTML = "%"

		// // Outputs CARG to index.html
		// document.getElementById("promptCharlson").innerHTML = "Charlson Comorbidity score: ";
		document.getElementById("Charlson_out").innerHTML =Charlson;


	  // Adds string for ACE and CIRSG //
	  deets_in += "\n" + "\n" + " *** ACE 27 Inputs ***" +"\n"
	  deets_in += "Please manually record ACE comorbidities" + "\n"+ "\n"

	  deets_in += "\n" + "\n" + " *** CIRSG Inputs ***" +"\n"
	  deets_in += "Please manually record CIRSG comorbidities" + "\n"+ "\n"
		// GETS CIRS-G and ACE and outputs them//

		var cirs = calculateCIRS();
		var ace = getACE();

		if (ace === undefined) {
		  ace = '-';
		}

		document.getElementById("aceout").innerHTML = ace



		//var ace = document.getElementById('CIRS').value
		document.getElementById("cirsout").innerHTML = cirs;


	// !!!!NEW BUTTON FEATURE!!!!
		$("#calcelg").click(function(){
	  $("#elgout").removeClass("alert alert-danger alert-success");
	  $("*").removeClass("meetscrit")
		if (age >= 70){
		  var ELIG = 0;
		  if (R < -0.25) {ELIG += 1;
			$("#omega_out, #omega_label").addClass("meetscrit");
		  }
		  if (ace >= 1) {ELIG += 1;
			$("#aceout, #ACE_label").addClass("meetscrit");
		  }
		  if (cirs >= 4) {ELIG += 1;
			$("#cirsout, #CIRS_label").addClass("meetscrit");
		  }
		  if (Charlson >=1) {ELIG += 1;
			$("#Charlson_out, #Charlson_label").addClass("meetscrit");
		  }
		  if (pCARG >= 30) {ELIG += 1;
			$("#CARG_out, #CARG_label").addClass("meetscrit");
		  }
		  if (g8 <= 14) {ELIG += 1;
			$("#G8Score, #G8_label").addClass("meetscrit");
		  }

		  if (ELIG >= 1){
			var eligible_out = ["Qualifies by ", ELIG, "criteria."]
			document.getElementById("elgout").innerHTML = eligible_out.join(" ")
			$("#elgout").addClass("alert alert-success");
		  }


		 else if (document.getElementById("pneuro").checked) {
		  var eligible_out = ["Qualifies by Cisplatin Contraindication"]
		  document.getElementById("elgout").innerHTML = eligible_out
			$("#elgout").addClass("alert alert-success");
		}
		else if (document.getElementById("hearloss").checked) {
		 var eligible_out = ["Qualifies by Cisplatin Contraindication"]
		 document.getElementById("elgout").innerHTML = eligible_out
		  $("#elgout").addClass("alert alert-success");
	   }

	  else if (ecog > 1) {
	   var eligible_out = ["Qualifies by Cisplatin Contraindication"]
	   document.getElementById("elgout").innerHTML = eligible_out
		 $("#elgout").addClass("alert alert-success");
	 }
	 else if (CGF < 60) {
	  var eligible_out = ["Qualifies by Cisplatin Contraindication"]
	  document.getElementById("elgout").innerHTML = eligible_out
		$("#elgout").addClass("alert alert-success");
	}
		  else if(ELIG<1){
			document.getElementById("elgout").innerHTML = "Does not qualify"
		  $("#elgout").addClass("alert alert-danger");
		  }
		}


		else {
		  var ELIG = 0
		  if (R < -0.25) {ELIG += 1;
			$("#omega_out, #omega_label").addClass("meetscrit");
		  }
		  if (ace >=1) {ELIG += 1;
			$("#aceout, #ACE_label").addClass("meetscrit");
		  }
		  if (Charlson >= 1) {ELIG += 1;
			$("#Charlson_out, #Charlson_label").addClass("meetscrit");

		  }
		  if (pCARG >= 30) {ELIG += 1;
			$("#CARG_out, #CARG_label").addClass("meetscrit");
		  }

		  if (cirs >= 4) {ELIG += 1;
			$("#cirsout, #CIRS_label").addClass("meetscrit");
		  }
		  if (g8 <= 14) {ELIG += 1;
			$("#G8Score, #G8_label").addClass("meetscrit");
		  }

		  if (ELIG >= 2) {
			var eligible_out = ["Qualifies by ", ELIG, "criteria."]
			// document.getElementById("ElAlert").className = "alert alert-success";
			document.getElementById("elgout").innerHTML = eligible_out.join(" ")
			  $("#elgout").addClass("alert alert-success");
		  }

		else if (document.getElementById("pneuro").checked) {
		 var eligible_out = ["Qualifies by Cisplatin Contraindication"]
		 document.getElementById("elgout").innerHTML = eligible_out
	  $("#elgout").addClass("alert alert-success");
	   }
	   else if (document.getElementById("hearloss").checked) {
		var eligible_out = ["Qualifies by Cisplatin Contraindication"]
		document.getElementById("elgout").innerHTML = eligible_out
	  $("#elgout").addClass("alert alert-success");
	  }

	 else if (ecog > 1) {
	  var eligible_out = ["Qualifies by Cisplatin Contraindication"]
	  document.getElementById("elgout").innerHTML = eligible_out
	  $("#elgout").addClass("alert alert-success");
	}
	else if (CGF < 60) {
	 var eligible_out = ["Qualifies by Cisplatin Contraindication"]
	 document.getElementById("elgout").innerHTML = eligible_out
	  $("#elgout").addClass("alert alert-success");
	}

		  else if(ELIG<2){
			// document.getElementById("ElAlert").className = "alert alert-warning";
						$("#elgout").addClass("alert alert-danger");
				  document.getElementById("elgout").innerHTML = "Does not qualify"

		  }
		}
	  });
		$("#PDF").unbind().click(function(){
		var doc = new jsPDF();
		doc.setFontType("bold");
		doc.text(20, 20, 'Model Input:');
		doc.setFontType("defaultText");
		doc.setFontSize(12);
		doc.text(20,40,deets_in);

		doc.addPage();
		doc.setFontType("bold");
		doc.text(20, 20, 'Model Output:');
		doc.setFontType("defaultText");
		doc.setFontSize(12);
		doc.text(20,30,deets_out);
		//save the pdf
		doc.save('HN004 comogram.pdf');
	})

		// outputs
		deets_out += 'w score:' + wp + '\n'
		deets_out += 'CARG Score:' + CARG + '\n'
		deets_out += 'CCI Score:' + Charlson + '\n'
		deets_out += 'G8 Score:' + g8 + '\n'
		deets_out += 'CIRS-G Score:' + cirs + '\n'
		deets_out += 'ACE-27 Score:' + ace + '\n'


		$("#deets").val(deets_in + deets_out);

	  }
	});
