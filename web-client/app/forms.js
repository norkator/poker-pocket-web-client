//$(function () {
var $formLogin = $('#login-form');
var $formRegister = $('#register-form');
var $divForms = $('#div-forms');
var $loggedInUserIcon = $('#loggedInUserIcon');
var $navBarLoginBtn = $('#nav_bar_login_btn');
var $logoutBtn = $('#login_logout_btn');
var $modalAnimateTime = 300;
var $msgAnimateTime = 150;
var $msgShowTime = 2000;
var $msgShowTimePasswordWarning = 5000;
setLogoutVisibility();

$("form").submit(function () {
  switch (this.id) {
    case "login-form":
      var $lg_username = $('#login_username').val();
      var $lg_password = $('#login_password').val();
      msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "Logging in...", $msgShowTime);
      userLogin($lg_username, $lg_password);
      return false;
      break;
    case "register-form":
      var $rg_username = $('#register_username').val();
      var $rg_password = $('#register_password').val();
      var $rg_email = $('#register_email').val();
      if (String($rg_password).length > 5) {
        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "Creating account...", $msgShowTime);
        createAccount($rg_username, $rg_password, $rg_email);
      } else {
        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "Password must be longer than five characters.", $msgShowTimePasswordWarning);
      }
      return false;
      break;
    default:
      return false;
  }
  return false;
});

function setLogoutVisibility() {
  if (localStorage.getItem(LS_LOGGED_IN) === 'true') {
    $logoutBtn.show();
    $navBarLoginBtn.hide();
    $loggedInUserIcon.show();
  } else {
    $logoutBtn.hide();
    $navBarLoginBtn.show();
    $loggedInUserIcon.hide();
  }
}

$('#login_register_btn').click(function () {
  modalAnimate($formLogin, $formRegister)
});
$('#register_login_btn').click(function () {
  modalAnimate($formRegister, $formLogin);
});
$('#accept_policy_btn').click(function () {
  localStorage.setItem(LS_POLICY_ACCEPTED, true);
});
if (localStorage.getItem(LS_POLICY_ACCEPTED) === 'false' || localStorage.getItem(LS_POLICY_ACCEPTED) == null) {
  $('#policyModal').modal('show');
}
$logoutBtn.click(function () {
  localStorage.removeItem(LS_USERNAME);
  localStorage.removeItem(LS_PASSWORD);
  localStorage.setItem(LS_LOGGED_IN, false);
  location.reload();
});

function modalAnimate($oldForm, $newForm) {
  var $oldH = $oldForm.height();
  var $newH = $newForm.height();
  $divForms.css("height", $oldH);
  $oldForm.fadeToggle($modalAnimateTime, function () {
    $divForms.animate({height: $newH}, $modalAnimateTime, function () {
      $newForm.fadeToggle($modalAnimateTime);
    });
  });
}

function msgFade($msgId, $msgText) {
  $msgId.fadeOut($msgAnimateTime, function () {
    $(this).text($msgText).fadeIn($msgAnimateTime);
  });
}

function msgChange($divTag, $iconTag, $textTag, $divClass, $msgText, $showTime) {
  var $msgOld = $divTag.text();
  msgFade($textTag, $msgText);
  $divTag.addClass($divClass);
  setTimeout(function () {
    msgFade($textTag, $msgOld);
    $divTag.removeClass($divClass);
  }, $showTime);
}

//});
