
      var x, i, j, l, ll, selElmnt, a, b, c;
      /*look for any elements with the class "custom-select":*/
      x = document.getElementsByClassName("custom-select");
      l = x.length;
      for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
          /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
                and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                //Holder
            //     var selectedOption = this.innerHTML
            //     console.log(selectedOption)

            var selectElement = document.getElementById('courseSelect');
              selectElement.addEventListener('change', function(event) {
                  var selectedOption = event.target.value;
                  console.log(selectedOption); // Print selected option to console
                });
                  console.log("This is the stored value",this.innerHTML)
                  console.log("This ran")
                  sel = this.innerHTML
                   //---------------------------------------------------------------------
                  // Construct the JSON object
                  var requestData = { table: sel, limit: 20 };

                  // Create a new XMLHttpRequest object
                  var xmlhttp = new XMLHttpRequest();

                  // Define the onload function to handle the response
                  xmlhttp.onload = function () {
                    // Check if the response is successful
                    if (xmlhttp.status == 200) {
                      // Parse the JSON response
                      const json = '{"CHEM":{"BREAKING BAD":"6", "METHOLOGICAL":7, "COMPOUND DIVISION":"8"}, ' + 
              '"CSIT":{"Software Engineer":"400", "Discrete Mathematics":170}, ' +
              '"ENGL":{"Coming of Age Theme":"103", "Intro to Literature":"111"}, ' +
              '"HIST":{"Religions of the World":"100", "Intro to American Studies":"110"}, ' +
              '"BIOL":{"Life Science":"200", "Oraganisms And Diversity":"202"}}';

                      var myObj = JSON.parse(json);

                      // Process the JSON data and update the UI
                      let text = "<table border='1'>";
                      text += "<tr><td>" + "Course Name" + "|" + "Course ID"+ "</td></tr>"
                      for (let x in myObj) {
                        //WIP
                        if(x == sel){
                            for(let resultP in x){
                             if(Object.values(myObj[x])[resultP] == undefined){
                              continue;
                             }
                           text += "<tr><td>" +Object.keys(myObj[x])[resultP]+"|" +Object.values(myObj[x])[resultP]+ "</td></tr>";
                          }
                        }
                        //text += "<tr><td>" + myObj[x] + "</td></tr>";
                      }
                      text += "</table>";
                      document.getElementById("demo").innerHTML = text;
                    } else {
                      // Handle error if the request is not successful
                      console.error('Error occurred:', xmlhttp.statusText);
                    }
                  };

                  // // Open the request with POST method and specify the URL
                  xmlhttp.open("POST", "home");

                  // Set the request header
                  xmlhttp.setRequestHeader("Content-type", "application/json");

                  // Send the JSON data in the request body
                  xmlhttp.send(JSON.stringify(requestData));

      
                break;
              }
            }
            h.click();
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
          /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
      function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
          except the current select box:*/
        var x,
          y,
          i,
          xl,
          yl,
          arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i);
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }

      document.addEventListener("click", closeAllSelect);
   