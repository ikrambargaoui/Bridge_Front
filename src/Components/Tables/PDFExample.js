 
import React from 'react';
 
import Pdf from 'react-pdf';
 
export default class PDFExample extends React.Component {
    render() {
        const source = {uri:'file:///D:/WebProject/AVIS-DEBLOCAGE-DE-CREDIT_00000_00450000112_73_20181128.pdf',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};
 
        return (
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
               />
        )
  }
}
