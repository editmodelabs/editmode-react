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
      <svg preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{marginRight: "5px"}}>
        <g opacity=".8">
        <path d="m1.6925 4.2131s6.9175-3.7666 7.5952-4.1192c0.67776-0.35253 1.2739 0.35253 1.2739 1.025v8.0945c0 1.7257-0.2199 1.7257-0.92232 2.1684-0.70239 0.4428-7.9929 4.3926-8.3935 4.5953-0.40061 0.2028-1.2459-0.0997-1.2459-1.0136v-8.4086c0-1.5545 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#203260" fill-rule="evenodd"></path>
        <mask id="b" x="0" y="0" width="11" height="17" mask-type="alpha" maskUnits="userSpaceOnUse">
        <path d="m1.6925 4.2131s6.9175-3.7666 7.5952-4.1192c0.67776-0.35253 1.2739 0.35253 1.2739 1.025v8.0945c0 1.7257-0.2199 1.7257-0.92232 2.1684-0.70239 0.4428-7.9929 4.3926-8.3935 4.5953-0.40061 0.2028-1.2459-0.0997-1.2459-1.0136v-8.4086c0-1.5545 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"></path>
        </mask>
        <g mask="url(#b)">
        <path d="m2.9346 7.9074s6.9175-3.7666 7.5952-4.1192c0.6778-0.35254 1.2739 0.35253 1.2739 1.025v8.0944c0 1.7258-0.2199 1.7258-0.9223 2.1685s-7.9929 4.3925-8.3935 4.5953-1.2458-0.0997-1.2458-1.0136v-8.4087c0-1.5545 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#000719" fill-rule="evenodd"></path>
        </g>
        <path d="m6.978 7.3208s6.9175-3.7666 7.5952-4.1192c0.6778-0.35254 1.2739 0.35253 1.2739 1.025v8.0945c0 1.7257-0.2199 1.7257-0.9223 2.1684-0.7023 0.4428-7.9929 4.3926-8.3935 4.5954-0.40061 0.2027-1.2459-0.0998-1.2459-1.0137v-8.4086c0-1.5545 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#223464" fill-rule="evenodd"></path>
        <mask id="a" x="5" y="3" width="11" height="17" mask-type="alpha" maskUnits="userSpaceOnUse">
        <path d="m6.978 7.3208s6.9175-3.7666 7.5952-4.1192c0.6778-0.35254 1.2739 0.35253 1.2739 1.025v8.0945c0 1.7257-0.2199 1.7257-0.9223 2.1684-0.7023 0.4428-7.9929 4.3926-8.3935 4.5954-0.40061 0.2027-1.2459-0.0998-1.2459-1.0137v-8.4086c0-1.5545 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"></path>
        </mask>
        <g mask="url(#a)">
        <path d="m8.4483 11.062s6.9175-3.7667 7.5952-4.1192c0.6778-0.35253 1.2739 0.35254 1.2739 1.025v8.0945c0 1.7257-0.2199 1.7257-0.9222 2.1684-0.7024 0.4428-7.993 4.3926-8.3936 4.5954-0.40061 0.2027-1.2458-0.0998-1.2458-1.0136v-8.4087c0-1.5546 1.6925-2.3418 1.6925-2.3418z" clip-rule="evenodd" fill="#000719" fill-rule="evenodd"></path>
        </g>
        <path d="m12.543 10.883s6.9235-3.7101 7.6019-4.0573c0.6783-0.34725 1.275 0.34724 1.275 1.0096v7.9731c0 1.6998-0.2201 1.6998-0.9231 2.1359s-7.9999 4.3267-8.4009 4.5264c-0.4009 0.1997-1.2469-0.0983-1.2469-0.9984v-8.2826c0-1.5312 1.694-2.3067 1.694-2.3067z" clip-rule="evenodd" fill="#405489" fill-rule="evenodd"></path>
        </g>
      </svg>
      <span style={{fontSize: 13, fontWeight: 600}}>Powered by Editmode</span>
    </div>
  )
}