(function ($) {
    "use strict";

    $('#quote-section').html(`
    <div class="quote-button" id="quote-button">
        <button type="button" class="myButton">Get a Quote</button>
    </div>
    <div class="form-block" style="display: none;">
        <div class="form-wrap">
            <form id="quote-form" action="#" method="post" target="_blank" class="form validate-form">
                <h3 class="form-block-title">Request for Quote</h3>
                <p>Please take a moment to fill the form</p>
                <div class="input-wrap validate-input" data-validate="Missed first name">
                    <label class="label" for="first-name">First name:</label>
                    <input type="text" id="first-name" class="input"
                        placeholder="Enter your first name">
                </div>
                <div class="input-wrap validate-input" data-validate="Missed last name">
                    <label class="label" for="last-name">Last name:</label>
                    <input class="input" type="text" id="last-name"
                        placeholder="Enter your last name">
                </div>
                <div class="input-wrap validate-input" data-validate="Missed phone number or invalid format">
                    <label class="label" for="phone-number">Phone number:</label>
                    <input class="input" type="text" id="phone-number"
                        placeholder="Enter your phone number: (123)456-7890">
                </div>
                <div class="input-wrap validate-input" data-validate="Missed email or invalid format">
                    <label class="label" for="email">Email:</label>
                    <input class="input" type="text" id="email" placeholder="Enter your email">
                </div>
                <div class="input-wrap">
                    <label class="label" for="chosed-service">Needed Services:</label><br>
                    <select class="selection" id="chosed-service">
                        <option>Choose a service</option>
                        <option>Handyman</option>
                        <option>Air conditioning</option>
                        <option>Painting</option>
                        <option>Drywall and Framing</option>
                        <option>Flooring</option>
                        <option>Shelving</option>
                        <option>Appliance repair and installation</option>
                        <option>Cleaning</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="input-wrap validate-input" data-validate="Say few words about your project">
                    <label class="label" for="description">Short description</label>
                    <textarea class="input" id="description" cols="40" rows="5"
                        placeholder="Add some information about your project. What we can help with?"></textarea>
                </div>
                <input id="submit-button" type="submit" value="Submit" class="myButton">
            </form>
        </div>
    </div>
    `)

    var quoteButton = $('#quote-button');
    var quoteForm = $('#quote-form');
    var firstName = $('#first-name');
    var lastName = $('#last-name');
    var phoneNumber = $('#phone-number');
    var email = $('#email');
    var chosedService = $('#chosed-service');
    var description = $('#description');

    quoteButton.on('click', showQuoteForm);
    quoteForm
        .on('submit', function (e) {
            var check = true;
            if (firstName.val().trim() == '') {
                showValidate(firstName);
                check = false;
            }
            if (lastName.val().trim() == '') {
                showValidate(lastName);
                check = false;
            }
            if (phoneNumber.val().trim().match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) == null) {
                showValidate(phoneNumber);
                check = false;
            }

            if (email.val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                showValidate(email);
                check = false;
            }

            if ((chosedService.val() === 'Choose a service' || chosedService.val() === 'Other') && description.val().trim() == '') {
                showValidate(description);
                check = false;
            }

            if (check) {
                var emailLink = generateEmail();
                quoteForm.attr('action', emailLink);
                hideQuoteForm();
            } else {
                e.preventDefault();
            }
        })
        .find('.input').each(function () {
            $(this).focus(function () {
                hideValidate(this);
            });
        });

    function showQuoteForm() {
        quoteButton.hide();
        quoteForm.parents('.form-block').show();
    }

    function hideQuoteForm() {
        quoteForm.parents('.form-block').hide();
        quoteButton.show();
    }

    function showValidate(input) {
        $(input).parent().addClass('alert-validate');
    }

    function hideValidate(input) {
        $(input).parent().removeClass('alert-validate');
    }

    function generateEmail() {
        var emailTo = 'Gustavo.garcia@reliablehelps.com,Darwin.pacheco@reliablehelps.com';
        var service = (service === 'Choose a service' || service === 'Other') ? 'Service' : chosedService.val();
        var subject = `Quote Request for ${service} from ${firstName.val()} ${lastName.val()}`;
        var desc = description.val().trim();
        if (desc) {
            desc = `\n${desc}\n`;
        }
        var body = `Hello,

I'm intersted in ${service}. Please send me a quote.
${desc}
Regards,
${firstName.val()} ${lastName.val()}
Phone: ${phoneNumber.val().trim()}
Email: ${email.val().trim()}
`
        return `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
})(jQuery);