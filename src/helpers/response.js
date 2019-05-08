function displayError(message = 'Error occurred') {
   return {status: 'error', message: message};
}

function displaySuccess(responseObject = {}, message='Successful') {
   return {
       status: 'success',
       body: {
           message: message,
           response: responseObject
       }
   }
}

module.exports.displayError = displayError;
module.exports.displaySuccess = displaySuccess;