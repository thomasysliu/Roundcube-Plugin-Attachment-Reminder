/* Attachment Reminder plugin script */
/* TODO: Prompt on keypress , show matched keyword , localization

 */
 
 


function rcmail_get_compose_message()
{
    if (window.tinyMCE && (ed = tinyMCE.get(rcmail.env.composebody)))
		return ed.getContent();
    else
    {
    	if(document.getElementById("compose-body"))
    		return document.getElementById("compose-body").value;
    	else
    		return document.getElementById("composebody").value;
    }
}

function rcmail_check_message( msg )
{

	keyword = [
            "attachment", "file", "attach", "attached", "attaching", "enclosed", "CV", "cover letter",
            "anbei", "im anhang", "attaching", ".doc", ".pdf", "adjunto",
            "joins","joint","attaché",
            "angehängt", "angefügt", "beigefügt", "beliegend", "附件","附加","附檔","附上","附加檔案"
        ];

	for (var i = 0; i < keyword.length; i++) { 
		var rg = new RegExp(keyword[i],'i');
		if( msg.search(rg) != -1 ){
			return true;
		}
		
	}

	return false;
}



function rcmail_have_attachments()
{
	if (rcmail.env.attachments){
				var list = rcmail.gui_objects.attachmentlist.getElementsByTagName("li");
				if( list.length > 0){
					return true;
				}
	}
	return false;
}



if (window.rcmail) {

        rcmail.addEventListener('beforesend', function(evt) {
		 //Get value
		 msg = rcmail_get_compose_message();
		 subject = document.getElementById("compose-subject").value;
		 
		 //Check attachment
		 
		 have_attachment = rcmail_have_attachments();
		 contain_key_word = rcmail_check_message(msg) || rcmail_check_message(subject);
		 
		 if( !have_attachment && contain_key_word ){
			 //Confirm
                         var attach_now = confirm(rcmail.gettext('forgotattachment', 'attachment_reminder'));
			 if (attach_now) {
					//Show upload dialog.
					rcmail_ui.show_popup('uploadmenu', true);
					return false;
					
			}
			 
		}
		 
		 
		 //TODO: prompt on typing
		 
		});
	}




