var FormValidation = function () {

    //User Registration Form
    var userValidation = function () {

        $("#userForm").validate({
            /* @validation states + elements 
             ------------------------------------------- */
            errorElement: 'span', //default input error message container
            errorClass: "help-block help-block-error invalid-feedback",
            validClass: "state-success",
            /* @validation rules 
             ------------------------------------------ */
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                mobile: {
                    required: true,
                    minlength: 10,
                    maxlength: 14,
                    number: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true,
                    minlength: 5
                },
                password: {
                    required: true
                },
                cpassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                role: {
                    required: true
                },
                status: {
                    required: true
                }
            },
            /* @validation error messages 
             ---------------------------------------------- */
            messages: {
                firstname: {
                    required: "Please enter your firstname",
                    minlength: "Firstname at least 3 characters"
                },
                lastname: {
                    required: "Please enter your lastname",
                    minlength: "Lastname at least 3 characters"
                },
                mobile: {
                    required: "Please enter your mobile no",
                    minlength: "Please enter a valid mobile no",
                    maxlength: "Please enter a valid mobile no",
                    number: "Please enter a valid mobile no"
                },
                email: {
                    required: "Please enter your email address",
                    email: "Please enter a valid email address"
                },
                username: {
                    required: "Please enter username",
                    minlength: "Please enter minumum 5 charecter"
                },
                password: {
                    required: "Please enter a password",
                    minlength: "Password must be at least 5 characters long"
                },
                cpassword: {
                    required: "Please enter you confirm password",
                    minlength: "Confirm password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                role: {
                    required: "Please select user role"
                },
                status: {
                    required: "Please select user status"
                }
            },
            /* @validation highlighting + error placement  
             ---------------------------------------------------- */
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            }

        });

    };

    //Admin Login Form
    var loginValidation = function () {

        $("#loginForm").validate({
            /* @validation states + elements 
             ------------------------------------------- */
            errorElement: 'span', //default input error message container
            errorClass: "help-block help-block-error invalid-feedback",
            validClass: "state-success",
            /* @validation rules 
             ------------------------------------------ */
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            /* @validation error messages 
             ---------------------------------------------- */
            messages: {
                username: {
                    required: "Please enter your username"
                },
                password: {
                    required: "Please enter a password",
                    minlength: "Password must be at least 5 characters long"
                }
            },
            /* @validation highlighting + error placement  
             ---------------------------------------------------- */
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            }

        });

    };

    return {
        //main function to initiate the module
        init: function () {
            userValidation();
            loginValidation();
        }
    };
}();
jQuery(document).ready(function () {
    FormValidation.init();
});




