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

export default function Watermark() {
  return (
    <div style={styles} onClick={() => window.location.href = "https://editmode.com"}>
      <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 548 532" version="1.1" fill="currentColor">
        <g id="Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-2-Copy" fill="#02164B" fillRule="nonzero">
                <path d="M355.57238,93.227099 C421.07938,126.760445 463.228656,200.366589 458.662484,275.197013 C456.789183,321.18219 437.646387,365.465318 406.824729,398.879222 C371.729602,436.503458 321.735878,458.271766 270.922584,458.988418 C203.22031,459.764791 137.596229,421.453764 104.754918,360.956382 C83.2997657,322.496052 75.4553171,276.928922 82.5387371,233.302725 C89.0952911,193.767417 107.828303,156.501508 135.840009,128.343052 C167.861751,95.3770553 211.620895,75.6989829 256.902096,72.4143274 C290.88495,70.1150686 325.248318,77.4308922 355.57238,93.227099 Z M302.597364,108.707879 C244.580186,94.7144282 181.478422,121.295874 147.91428,172.136709 C125.753716,204.951046 116.495656,247.175826 123.079165,286.681355 C127.575938,318.48743 142.800303,348.796389 164.461226,371.680876 C195.556552,404.281339 240.406711,421.818983 284.492713,417.297082 C306.976574,415.738859 326.903446,407.153357 347.094835,397.529041 C333.927816,397.406827 321.113485,400.462166 307.975856,399.881651 C293.691992,399.33169 279.114221,397.284614 265.565123,392.487732 C232.823919,381.213532 204.168018,358.573473 185.916413,328.020087 C170.074843,302.721883 162.668395,271.465768 167.841152,241.52345 C172.896347,214.850343 187.297774,190.224314 208.429665,174.061573 C244.874093,144.791428 299.77586,145.463603 335.750037,175.344815 C370.842495,203.117843 385.273313,253.25595 370.783713,296.550099 C362.524936,322.978778 344.831754,343.357887 322.553628,358.145726 C342.069031,355.12094 360.261854,348.643622 375.985862,336.025074 C406.7285,312.315646 423.275446,271.129681 418.043907,231.715813 C408.727065,170.822914 360.320636,120.89868 302.597364,108.707879 Z M322.507627,229.728263 C308.735553,203.164192 276.64924,189.629307 248.46453,198.136949 C218.823998,206.287627 198.529842,236.927037 201.907349,268.072146 C204.498711,292.375445 220.017772,314.804683 242.932407,323.074349 C267.302864,332.68263 295.895205,325.930061 313.510648,306.148306 C331.970469,285.593129 335.813839,254.180297 322.507627,229.728263 Z" id="Combined-Shape"></path>
            </g>
        </g>
      </svg>
      <span style={{fontSize: 13, fontWeight: 600}}>Powered by Editmode</span>
    </div>
  )
}