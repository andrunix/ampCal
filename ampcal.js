//---------------------------------------------------------------------------
//
// File:    ampCal.js
// Purpose: This is the source file for the ampCal JavaScript Calendar.
// Author:  Andrew M. Pierce
// Date:    08/21/1998
//
// Copyright (c) 1998-2006, Andrew M. Pierce
//
// Description:
//   This souce code is provided as is, without guarantee or warranty of
//   any kind.  You are free to use and distribute this source without 
//   obtaining written permission from the author providing you do not
//   remove or modify the copyright line which displays at the bottom 
//   of the calendar.
//
//   See the readme.txt file which should accompany this file for complete
//   instructions on how to use this calendar.
//
// -------------------------------------------------------------------------
//
// M O D I F I C A T I O N   H I S T O R Y
// ---------------------------------------
//
//    Date    By  Description
// ----------	--- ----------------------------------------------------------
// 09/21/1998 amp Initial revision.
// 09/28/1998 amp Made the height of the day blocks a minimum of 70 and 
//                centered column headings.
// 11/06/1998 amp Repeated the font specification on each day because 
//                Netscape had a problem with it.  Also placed the entire
//                calendar in a table so I can control the background color
//                so my header and copyright line show up.  
// 11/25/1998 amp Add a row for days 30 and 31 if necessary.  Also made 
//                colors work correctly in past and future.                                     
// 12/09/1998 amp Fixed the color problem permanently.
// 02/16/1999 amp Forced the year to 4 digits.
// 09/21/1999 amp Updated with baja information.  
// 10/01/2006 amp Web 2.0 version
//
//---------------------------------------------------------------------------

<!--

function ampCalendar_setFebDays()
{
  if ( this.month == 1 ) {
    if ( this.year % 4 == 0 ) {
      if ( this.year % 100 == 0) {
        if ( this.year % 400 == 0) 
          this.m_rgDays[1] = 29;
      }
      else
        this.m_rgDays[1] = 29;
    }
  }
}

function ampCalendar_Display()
{
  var strDeadCell;
  var strCellContents;
  var strDateNum;
  var strCellText;
  var cellClass;
	
  strDeadCell = "<td class=\"acDead\">&nbsp;</td>";

  document.writeln("<table class=\"acMain\">");
  document.writeln("<tr><td class=\"acTitle\">");
  document.writeln(this.title);
  document.writeln("</td></tr>");
  document.writeln("<tr><td>");
  document.writeln("<table class=\"acCalBody\">");
  document.writeln("<tr>");
  document.writeln("<td class=\"acHeader\">Sunday</td>");
  document.writeln("<td class=\"acHeader\">Monday</td>");
  document.writeln("<td class=\"acHeader\">Tuesday</td>");
  document.writeln("<td class=\"acHeader\">Wednesday</td>");
  document.writeln("<td class=\"acHeader\">Thursday</td>");
  document.writeln("<td class=\"acHeader\">Friday</td>");
  document.writeln("<td class=\"acHeader\">Saturday</td>");
  document.writeln("</tr>");
	
  // now create each row
  for (j = 0; j < 6; j++) {
    if( 5 == j && this.m_myDate.getDate() < 30 ) {
      // Check to see if we've already printed all
      // the days.  If so, get out without doing another row.
      break;
    }
    //x = 0;
    document.writeln("<tr>");
    for( i = 0; i < 7; i++) {
      // Is this a "dead" cell?
      if ( this.m_myDate.getDay() > (i /*+ x*/) || 
           this.m_myDate.getMonth() != this.month - 1 )
        document.writeln( strDeadCell );
      else {
        if ( this.m_myDate.getYear() < this.m_now.getYear()) {
          cellClass = "acPast";
        }
        else if (this.m_myDate.getYear() > this.m_now.getYear()) {
          cellClass = "acFuture";
        }
        else {
          // Same year...
          if (this.m_myDate.getMonth() < this.m_now.getMonth() ) {
            cellClass = "acPast";
          }
          else if (this.m_myDate.getMonth() > this.m_now.getMonth() ) {
            cellClass = "acFuture";
          }
          else {
            // Same month...
            if (this.m_myDate.getDate() < this.m_now.getDate()) {
              cellClass = "acPast";
            }
            else if (this.m_myDate.getDate() > this.m_now.getDate()) {
              cellClass = "acFuture";
            }
            else {
              cellClass = "acToday";
            }
          }
       }
       strDateNum  = this.m_myDate.getDate();
       strCellText = this.getText( this.m_myDate.getDate() );

       strCellContents = "<td class=\"" + cellClass + "\">";
       strCellContents += "<span class=\"acNumber\">" + strDateNum + "</span><br/>";
       strCellContents += "<span class=\"acEntry\">" + strCellText + "</span></td>";
       document.writeln( strCellContents );
       this.m_myDate.setDate( this.m_myDate.getDate() + 1 );
     }
   }
   document.writeln("</tr>");
   // x += 7;
  }
  document.writeln("</table>");
  document.writeln("<span class=\"acCopyRite\">" +
    "Calendar by <a href=\"http://www.foomonkey.com/ampcal.html\" target=\"_top\">" +
    "ampCal</a> Version 2.0, Copyright © 1998-2006, Andrew M. Pierce</span");
  document.writeln("</td></tr></table>");
}

function ampCalendar_setItem( nDay, strText )
{
  x = this.m_rgDay.length;
  this.m_rgDay[x + 1] = nDay;
  this.m_rgTxt[x + 1] = strText;
}

function ampCalendar_getText( n )
{
  var x = 0;
  while( x < this.m_rgDay.length ) {
    if ( n == this.m_rgDay[x] ) 
      return this.m_rgTxt[x] ;
      x++;
  }
  return "";
}

//
// ampCalendar() - Constructor
//
function ampCalendar( m, y )
{
  // properties
  this.m_rgDay = new Array();
  this.m_rgTxt = new Array();

  // Static stuff

  this.m_rgDays = new Array( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ); 
  this.m_rgMths = new Array( "January", "February", "March", "April", 
                             "May", "June", "July", "August", 
                             "September", "October", "November", "December" );

  this.month = m;
  this.year  = (y < 1900? y+1900: y);
  this.m_now = new Date(); 
  this.m_myDate  = new Date(this.year, m - 1, 1);

  this.monthName = this.m_rgMths[ this.m_myDate.getMonth() ];
  this.title = this.monthName + " " + this.year;

  // Methods
  this.setFebDays = ampCalendar_setFebDays;
  this.display = ampCalendar_Display;
  this.setItem = ampCalendar_setItem;
  this.getText = ampCalendar_getText;

  this.setFebDays();
}
//-->


