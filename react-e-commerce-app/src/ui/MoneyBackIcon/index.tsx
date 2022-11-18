import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const MoneyBackIcon = ({
  viewBox = "0 0 70 70",
  width = "70",
  height = "70",
  sx = { width: "70px", height: "70px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      <g id="icon" transform="translate(-867 -1283)">
        <rect
          id="Rectangle_665"
          data-name="Rectangle 665"
          width="70"
          height="70"
          rx="10"
          transform="translate(867 1283)"
          fill="#fff3df"
        />
        <g id="noun_guarantee_2519048" transform="translate(883 1298.39)">
          <path
            id="Path_91"
            data-name="Path 91"
            d="M33.227,7.946,19.8,4.042a1.074,1.074,0,0,0-.612,0h0L5.763,7.946A1.074,1.074,0,0,0,5,8.977V20.7C5,30.9,18.657,34.433,19.242,34.578a1.052,1.052,0,0,0,.537-.005C20.617,34.363,34,30.808,34,20.7V8.977a1.074,1.074,0,0,0-.773-1.031ZM31.852,20.7c0,7.841-10.547,11.224-12.352,11.724-1.8-.5-12.352-3.867-12.352-11.724V9.788L19.5,6.19,31.852,9.783Z"
            fill="#fbb03b"
          />
          <path
            id="Path_92"
            data-name="Path 92"
            d="M27.7,19.074V20.2a3.222,3.222,0,0,0,.537,6.4h1.611a1.074,1.074,0,1,1,0,2.148H26.627a1.074,1.074,0,0,0,0,2.148H27.7v1.074a1.074,1.074,0,1,0,2.148,0V30.889a3.222,3.222,0,1,0,0-6.444H28.238a1.074,1.074,0,0,1,0-2.148H31.46a1.074,1.074,0,0,0,0-2.148H29.849V19.074a1.074,1.074,0,1,0-2.148,0Z"
            transform="translate(-9.275 -6.483)"
            fill="#fbb03b"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default MoneyBackIcon;
