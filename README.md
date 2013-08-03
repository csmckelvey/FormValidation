FormValidation
==============
Charles McKelvey
================

HTML/CSS form using javascript for interactive form validation. PHP is used as a backup.

That's pretty much it. The script uses regular expressions to check that things like names are only letters and phone 
numbers are only numbers. Emails aren't really validated but rather just checked to see if they are in the correct format
of [word]@[word].[word]. Even when javascript is disabled this form still looks the same, you just have to wait until
you click the validate button at the bottom to get any results. The form starts with the validate button being linked to
a PHP script, but if javascript is enabled it will remove that button and insert a new one with a connection to a
javascript function.

Feel free to use anything you want for anything you want.

=========================================================================================================================
