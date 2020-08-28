import React, { useEffect, useRef, useState } from 'react';

type timeOut = 'very-slow' | 'slow' | 'medium' | 'fast' | 'very-fast' | number;

interface IProps {
   isOpen: boolean;
   timeOut?: timeOut;
   showHeight?: number;
}

const Collapse: React.FC<IProps> = props => {
   const [ height, setHeight ] = useState<number>(0);
   const CollapseRef = useRef<any>();
   const timeOut = useRef<number>();

   useEffect(() => {
      if(CollapseRef.current && CollapseRef.current.children) {
         const element = CollapseRef.current.children[0] as HTMLElement;
         let getHeight: number = element.scrollHeight;

         if(typeof props.showHeight === 'number' && props.showHeight >= 0 && props.showHeight <= 100) {
            getHeight = ((getHeight * props.showHeight) / 100);
         }

         setHeight(getHeight);
      }
   }, [CollapseRef, props.showHeight]);

   switch (props.timeOut) {
      case 'very-slow':
         timeOut.current = 1;
         break;

      case 'slow': {
         timeOut.current = 0.7;
         break;
      }

      case undefined:
      case 'medium': {
         timeOut.current = 0.5;
         break;
      }

      case 'fast':  {
         timeOut.current = 0.3;
         break;
      }

      case 'very-fast': {
         timeOut.current = 0.1;
         break;
      }

      default: {
         if(typeof props.timeOut === 'number') {
            timeOut.current = props.timeOut;
         }
         break;
      }
   }

   return (
      <div
         style={{ transition: `${timeOut.current}s`, height: props.isOpen ? `${height}px` : 0, overflow: 'hidden' }}
         ref={CollapseRef}
      >
         {props.children}
      </div>
   )
}

export default Collapse;