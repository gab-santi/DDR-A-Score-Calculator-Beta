			function computeScore() {
				var regScore = "0000000";
				var exScore = "0000";

				// get judgement data
				var marv = Number($("#marvCount").val());
				var perf = Number($("#perfCount").val());
				var great = Number($("#greatCount").val());
				var good = Number($("#goodCount").val());
				var ok = Number($("#okCount").val());
				var miss = Number($("#missCount").val());

				// calculate the song's max combo
				var numSteps = marv + perf + great + good + miss;

				/* calculate the regular score
				 * formula derived from:
				 * http://aaronin.jp/ss9.html (DDR SN2-X3 scoring)
				 * https://remywiki.com/AC_DDR_A (DDR A scoring)
				 */
				var marvScore = 1000000 / (numSteps + ok);
				var perfScore = marvScore - 10;
				var greatScore = (marvScore * 0.6) - 10;
				var goodScore = (marvScore * 0.2) - 10;



				if (numSteps != 0)
					regScore = Math.floor(((marvScore * (marv + ok)) + (perfScore * perf) + (greatScore * great) + (goodScore * good) + 0.1) / 10) * 10 ;

				// calculate the EX score
				// formula: 3pts - marv and ok, 2pts - perf, 1pt - great, 0pts - everything else
				if (numSteps != 0)
					exScore = (marv * 3) + (perf * 2) + (great * 1) + (ok * 3);

				// find letter grade
				var letterGrade = "--";
				if (regScore >= 990000) { // AAA
					letterGrade = "AAA";
				} else if (regScore >= 950000 && regScore <= 989990) { // AA+
					letterGrade = "AA+";
				} else if (regScore >= 900000 && regScore <= 949990) { // AA
					letterGrade = "AA";
				} else if (regScore >= 890000 && regScore <= 899990) { // AA-
					letterGrade = "AA-";
				} else if (regScore >= 850000 && regScore <= 889990) { // A+
					letterGrade = "A+";
				} else if (regScore >= 800000 && regScore <= 849990) { // A
					letterGrade = "A";
				} else if (regScore >= 790000 && regScore <= 799990) { // A-
					letterGrade = "A-";
				} else if (regScore >= 750000 && regScore <= 789990) { // B+
					letterGrade = "B+";
				} else if (regScore >= 700000 && regScore <= 749990) { // B
					letterGrade = "B";
				} else if (regScore >= 690000 && regScore <= 699990) { // B-
					letterGrade = "B-";
				} else if (regScore >= 650000 && regScore <= 689990) { // C+
					letterGrade = "C+";
				} else if (regScore >= 600000 && regScore <= 649990) { // C
					letterGrade = "C";
				} else if (regScore >= 590000 && regScore <= 599990) { // C-
					letterGrade = "C-";
				} else if (regScore >= 550000 && regScore <= 589990) { // D+
					letterGrade = "D+";
				} else if (regScore >= 0 && regScore <= 549990 && numSteps != 0) { // D
					letterGrade = "D";
				}


				// find full combo type
				var fcType = "";

				if (miss == 0) {
					if (good == 0) {
						if (great == 0) {
							if (perf == 0) {
									if (marv == 0) {
										resetInput();
									} else {
										fcType = "Marvelous Full Combo";
									}
							} else {
								fcType = "Perfect Full Combo";
							}
						} else {
							fcType = "Great Full Combo";
						}
					} else {
						fcType = "Good Full Combo";
					}
				}

				// display results
				$("#numSteps").html(numSteps);
				$("#regScore").html(regScore);
				$("#exScore").html(exScore);
				$("#letterGrade").html(letterGrade)
				$("#fcType").html(fcType);
			}

			function resetInput() {
				$("#marvCount").val(0);
				$("#perfCount").val(0);
				$("#greatCount").val(0);
				$("#goodCount").val(0);
				$("#okCount").val(0);
				$("#missCount").val(0);
				$("#letterGrade").html("--");
				$("#fcType").html("");
				$("#regScore").html("0000000");
				$("#exScore").html("0000");
				$("#numSteps").html("0");
			}
