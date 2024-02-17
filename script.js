rset = `<tr>
<th scope="col">#</th>
<th scope="col">Website</th>
<th scope="col">Username / E-mail</th>
<th scope="col">Password</th>
<th scope="col">Delete</th>
</tr>`;

//delete button functionality
const deletePassword = (indexNo) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  let arrUpdated = arr.filter((e) => {
    return e.indexNo != indexNo;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showToast('Deleted Successfully', 'Success');
  showData();
};

const maskPass = (pass) => {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
};

const copyText = (txt) => {
  navigator.clipboard.writeText(txt).then(
    () => {
      showToast('Copied to Clipboard', 'Success');
    },
    () => {
      showToast('Copy Error!', 'danger');
    }
  );
};

//logic to fill the table
const showData = () => {
  let tb = $("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.html("No data to show");
  } else {
    tb.html(rset);
    let arr = JSON.parse(data);
    str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
  <th scope="row">${element.indexNo}</th>
  <td>${element.website}</td>
  <td>${
    element.username
  }  <img src="./svgs/copy.svg" style="cursor:pointer" onclick="copyText('${
        element.username
      }')"/></td>
  <td>${maskPass(
    element.password
  )}  <img src="./svgs/copy.svg" style="cursor:pointer" onclick="copyText('${
        element.password
      }')"/></td>
  <td><div id="${element.username}" style="cursor: pointer;">
  <img src="./svgs/delete.svg" style="cursor:pointer" onclick="deletePassword('${
    element.indexNo
  }')"/>
</div></td>
</tr>`;
    }
    tb.html(tb.html() + str);
  }

  InputWebsite.value = "";
  InputEmail.value = "";
  InputPassword.value = "";
};

// Show password functionality
$("#passwordToggle").click(function () {
  let pInput = $("#InputPassword");

  if (pInput.attr("type") === "password") {
    pInput.attr("type", "text");
    $(this).text("Hide");
  } else {
    pInput.attr("type", "password");
    $(this).text("Show");
  }
});

//submit button functionality
showData();
$(document).ready(function () {
  $("#submitButton").click(function (event) {
    event.preventDefault();
    let passwords = localStorage.getItem("passwords");
    if (passwords == null) {
      let json = [];
      json.push({
        indexNo: 1,
        website: InputWebsite.value,
        username: InputEmail.value,
        password: InputPassword.value,
      });
      showToast('Password Saved', 'Success');
      localStorage.setItem("passwords", JSON.stringify(json));
    } else {
      let json = JSON.parse(localStorage.getItem("passwords"));
      json.push({
        indexNo: json.length + 1,
        website: InputWebsite.value,
        username: InputEmail.value,
        password: InputPassword.value,
      });
      showToast('Password Saved', 'Success');
      localStorage.setItem("passwords", JSON.stringify(json));
    }
    showData();
  });
});

//toasts
const showToast = (message, type) => {
  const toastContainer = $('#toast-container');
  
  //toasts shouldn't stack up
  $('.toast').remove();

  // Create new toast
  const toast = `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="true" data-delay="3000">
      <div class="toast-header">
        <strong class="mr-auto">${type}</strong>
      </div>
      <div class="toast-body">${message}</div>
    </div>
  `;
  toastContainer.append(toast);

  // Show the toast
  $('.toast').toast('show');
};


//Animations
$("#navbar").fadeOut(0).fadeIn(700);
$("#saved-credentials").fadeOut(0).fadeIn(700);
$("#add-credentials").fadeOut(0).fadeIn(700);

