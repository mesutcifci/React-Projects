import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const GmailIcon = ({
  viewBox = "0 0 25 25",
  width = "25",
  height = "25",
  sx = { width: "25px", height: "25px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      <g id="gmail" transform="translate(0 -60.983)">
        <g
          id="Group_11"
          data-name="Group 11"
          transform="translate(1.255 60.983)"
        >
          <path
            id="Path_11"
            data-name="Path 11"
            d="M50.36,122.808,49.131,135.15H34.369l-.99-12.1,8.371,4.687Z"
            transform="translate(-33.379 -120.483)"
            fill="#f2f2f2"
          />
          <path
            id="Path_12"
            data-name="Path 12"
            d="M54.5,60.983l-8.193,7.7-8.193-7.7H54.5Z"
            transform="translate(-37.936 -60.983)"
            fill="#f2f2f2"
          />
        </g>
        <path
          id="Path_13"
          data-name="Path 13"
          d="M2.245,113.6v11.113H.908A.908.908,0,0,1,0,123.809V111.967l1.467.04Z"
          transform="translate(0 -49.067)"
          fill="#f14336"
        />
        <path
          id="Path_14"
          data-name="Path 14"
          d="M454.533,109.081v11.842a.908.908,0,0,1-.908.908h-1.337V110.717l.74-1.749Z"
          transform="translate(-435.28 -46.181)"
          fill="#d32e2a"
        />
        <path
          id="Path_15"
          data-name="Path 15"
          d="M19.253,61.891V62.9l-2.245,1.637-7.381,5.38-7.381-5.38L0,62.9V61.891a.908.908,0,0,1,.908-.908h.526l8.193,5.972,8.193-5.972h.525A.908.908,0,0,1,19.253,61.891Z"
          fill="#f14336"
        />
        <path
          id="Path_16"
          data-name="Path 16"
          d="M2.245,113.6,0,113.256v-1.289Z"
          transform="translate(0 -49.067)"
          fill="#d32e2a"
        />
      </g>
    </SvgIcon>
  );
};

export default GmailIcon;
