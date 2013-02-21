<?php
/**
 * Attachement Reminder
 *
 * A plugin that remind user to attach the files
 *
 * @version 1.0
 * @author Thomas Yu - Sian , Liu
 * @url https://github.com/thomasysliu/Roundcube-Plugin-Attachment-Reminder
 * 
 *      This program is free software; you can redistribute it and/or modify
 *      it under the terms of the GNU General Public License as published by
 *      the Free Software Foundation; either version 2 of the License, or
 *      (at your option) any later version.
 *      
 *      This program is distributed in the hope that it will be useful,
 *      but WITHOUT ANY WARRANTY; without even the implied warranty of
 *      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *      GNU General Public License for more details.
 *      
 *      You should have received a copy of the GNU General Public License
 *      along with this program; if not, write to the Free Software
 *      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 *      MA 02110-1301, USA.
 */

class attachment_reminder extends rcube_plugin
{
  public $task = 'mail';

  function init()
  {
    $rcmail = rcmail::get_instance();
    if($rcmail->action == 'compose') {
      $this->include_script('attachment_reminder.js');
      $this->add_texts('localization/', true);
    }

  }

}

?>
