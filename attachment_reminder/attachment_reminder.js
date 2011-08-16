/* Attachment Reminder plugin script */
/* TODO: Prompt on keypress , show matched keyword , localization

 */
 
 


function rcmail_get_compose_message()
{
    if (window.tinyMCE && (ed = tinyMCE.get(rcmail.env.composebody)))
		return ed.getContent();
    else
        return  document.getElementById("compose-body").value;
}

function rcmail_check_message( msg )
{
	keyword = ["attachment","file","attach","attached","attaching","enclosed","CV","cover letter","附件","附加","附檔","附上","附加檔案","attached",".doc",".pdf"];

	for (var i = 0; i < keyword.length; i++) {    
		//console.log(keyword[i]);
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
		 //console.log( msg );
		 
		 //Check attachment
		 
		 have_attachment = rcmail_have_attachments();
		 //console.log( have_attachment );
		 contain_key_word = rcmail_check_message(msg) || rcmail_check_message(subject);
		 
		 if( !have_attachment && contain_key_word ){
			 //Confirm
			 //alert("Remember to add attachment !!!");
			 if (confirm("您似乎忘記加入附件了，你確定要寄出？")) { 
					// do nothing things if OK
				}
			else{
					//Show upload dialog.
					rcmail_ui.show_popup('uploadmenu', true);
					return false;
					
			}
			 
			 }
		 
		 
		 //TODO: prompt on typing
		 
		});
	}

/*
	rcmail.addEventListener('init', function(evt) {
			$(document).ready(function() {
				if (rcmail.env.attachments)
				{

				var list = rcmail.gui_objects.attachmentlist.getElementsByTagName("li");
				for (i=0; i<list.length; i++){

				list[i].style.height="auto";
				var url = rcmail.env.comm_path+'&_action=display-attachment&_file='+list[i].id+'&_id='+rcmail.env.compose_id;
				var img_url = rcmail.env.comm_path+'&_action=plugin.preview&_file='+list[i].id+'&_id='+rcmail.env.compose_id;
				list[i].innerHTML = list[i].innerHTML.replace(/\<\/a\>/, '</a><a href="'+url+'">');
				begin=rcmail.gui_objects.attachmentlist.getElementsByTagName("a");
				list[i].innerHTML += '</a><div><img src="'+img_url+'"></div>';

				}

				}
				});
			})
	rcmail.ori_add2attachment_list=rcmail.add2attachment_list;
	rcmail.add2attachment_list = function(name, att, upload_id) {
		if(att.complete){
			var url = rcmail.env.comm_path+'&_action=display-attachment&_file='+name+'&_id='+rcmail.env.compose_id;
			var img_url = rcmail.env.comm_path+'&_action=plugin.preview&_file='+name+'&_id='+rcmail.env.compose_id;
			att.html = att.html.replace(/\<\/a\>/, '</a><a href="'+url+'">');
			att.html += '</a><div><img src="'+img_url+'"></div>';

		}
		this.ori_add2attachment_list(name, att, upload_id);
		if(att.complete){
			document.getElementById(name).style.height="auto";
		}
	};

*/




