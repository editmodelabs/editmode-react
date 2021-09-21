import React from 'react'
const styles = {
  zIndex: 9999,
  bottom: 8,
  right: 8,
  position: "fixed",
  opacity: 1,
  display: 'flex',
  alignItems: "center",
  background: "rgba(255,255,255, 0.9)",
  cursor: "pointer",
  borderRadius: 5,
  padding: "2px 5px 2px 2px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
}

export default function Watermark({projectId}) {
  return (
    <div style={styles} onClick={() => window.open(`https://editmode.com?ref=pb&pid=${projectId}`)}>
      <svg width="24" height="24" preserveaspectratio='xMidYMid meet' version='1.0' xmlns='http://www.w3.org/2000/svg'>
        <g opacity=".8">
        <path d="m4.4758 11.968s18.293-10.7 20.085-11.701c1.7923-1.0014 3.3688 1.0014 3.3688 2.9117v22.994c0 4.9022-0.5815 4.9022-2.4389 6.1598-1.8575 1.2577-21.137 12.478-22.196 13.054-1.0594 0.576-3.2946-0.2834-3.2946-2.8793v-23.886c0-4.4159 4.4758-6.6523 4.4758-6.6523z" clip-rule="evenodd" fill="#203260" fill-rule="evenodd"/>
        <mask id="b2" x="0" y="0" width="28" height="46" mask-type="alpha" maskUnits="userSpaceOnUse">
        <path d="m4.4758 11.968s18.293-10.7 20.085-11.701c1.7923-1.0014 3.3688 1.0014 3.3688 2.9117v22.994c0 4.9022-0.5815 4.9022-2.4389 6.1598-1.8575 1.2577-21.137 12.478-22.196 13.054-1.0594 0.576-3.2946-0.2834-3.2946-2.8793v-23.886c0-4.4159 4.4758-6.6523 4.4758-6.6523z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        </mask>
        <g mask="url(#b2)">
        <path d="m7.7605 22.462s18.293-10.7 20.085-11.701c1.7923-1.0014 3.3688 1.0014 3.3688 2.9117v22.994c0 4.9022-0.5815 4.9022-2.4389 6.1599-1.8575 1.2577-21.137 12.478-22.196 13.054-1.0594 0.576-3.2946-0.2834-3.2946-2.8793v-23.886c0-4.4159 4.4758-6.6523 4.4758-6.6523z" clip-rule="evenodd" fill="#000719" fill-rule="evenodd"/>
        </g>
        <path d="m18.453 20.796s18.293-10.7 20.085-11.701c1.7923-1.0014 3.3688 1.0014 3.3688 2.9117v22.994c0 4.9021-0.5815 4.9021-2.4389 6.1598-1.8575 1.2577-21.137 12.478-22.196 13.054-1.0594 0.576-3.2946-0.2834-3.2946-2.8794v-23.886c0-4.4159 4.4757-6.6523 4.4757-6.6523z" clip-rule="evenodd" fill="#223464" fill-rule="evenodd"/>
        <mask id="a2" x="13" y="8" width="29" height="47" mask-type="alpha" maskUnits="userSpaceOnUse">
        <path d="m18.453 20.796s18.293-10.7 20.085-11.701c1.7923-1.0014 3.3688 1.0014 3.3688 2.9117v22.994c0 4.9021-0.5815 4.9021-2.4389 6.1598-1.8575 1.2577-21.137 12.478-22.196 13.054-1.0594 0.576-3.2946-0.2834-3.2946-2.8794v-23.886c0-4.4159 4.4757-6.6523 4.4757-6.6523z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        </mask>
        <g mask="url(#a2)">
        <path d="m22.341 31.424s18.293-10.7 20.085-11.701 3.3687 1.0014 3.3687 2.9117v22.994c0 4.9021-0.5815 4.9021-2.4389 6.1598s-21.137 12.478-22.196 13.054c-1.0594 0.576-3.2946-0.2835-3.2946-2.8794v-23.886c0-4.4159 4.4758-6.6523 4.4758-6.6523z" clip-rule="evenodd" fill="#000719" fill-rule="evenodd"/>
        </g>
        <path d="m33.169 30.915s18.309-10.539 20.103-11.526c1.7939-0.9864 3.3718 0.9864 3.3718 2.868v22.649c0 4.8286-0.5821 4.8286-2.4411 6.0674-1.8591 1.2388-21.155 12.291-22.216 12.858-1.0603 0.5673-3.2975-0.2792-3.2975-2.8362v-23.528c0-4.3496 4.4797-6.5525 4.4797-6.5525z" clip-rule="evenodd" fill="#405489" fill-rule="evenodd"/>
        </g>
      </svg>
      <span style={{fontSize: 13, fontWeight: 600}}>Powered by Editmode</span>
    </div>
  )
}