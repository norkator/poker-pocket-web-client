// This script is used to check support for some used technologies


function verifyBrowserSupport() {
  if (verifyAsyncSupport) {
    return true;
  } else {
    window.location.replace("http://nitramite.com");
    return false;
  }
}


// Check for Async function support
function verifyAsyncSupport() {
  try {
    new Function('async () => {}')();
  } catch (error) {
    return false;
  }
  return true;
}
