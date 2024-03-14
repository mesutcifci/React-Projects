import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ShippingIcon = ({
  viewBox = "0 0 70 70",
  width = "70",
  height = "70",
  sx = { width: "70px", height: "70px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      {" "}
      <g id="icon" transform="translate(-187 -1283)">
        <rect
          id="Rectangle_660"
          data-name="Rectangle 660"
          width="70"
          height="70"
          rx="10"
          transform="translate(187 1283)"
          fill="#fff3df"
        />
        <g
          id="Group_179"
          data-name="Group 179"
          transform="translate(203.154 1306.333)"
        >
          <path
            id="Path_189"
            data-name="Path 189"
            d="M47.425,30.727l-1.7-3.949a3.9,3.9,0,0,0-3.6-2.361H39.373V23.41a1.512,1.512,0,0,0-1.51-1.51h-19.2a1,1,0,0,0-1.007,1.007,1.025,1.025,0,0,0,1.007,1.007H37.282v7.433a1.652,1.652,0,0,0,1.665,1.665h6.7v4.684a.347.347,0,0,1-.348.348H44.057a3.725,3.725,0,0,0-3.213-1.858,3.809,3.809,0,0,0-3.213,1.858H27.294a3.725,3.725,0,0,0-3.213-1.858,3.809,3.809,0,0,0-3.213,1.858H17.307a1.007,1.007,0,1,0,0,2.013h3.058a3.72,3.72,0,0,0,7.433,0h9.33a3.72,3.72,0,0,0,7.433,0h.813a2.371,2.371,0,0,0,2.361-2.361v-5.42A4.414,4.414,0,0,0,47.425,30.727ZM24.081,41.6a1.7,1.7,0,1,1,1.7-1.7A1.718,1.718,0,0,1,24.081,41.6Zm16.763,0a1.7,1.7,0,1,1,1.7-1.7A1.718,1.718,0,0,1,40.844,41.6Zm-1.51-15.137h2.749a1.814,1.814,0,0,1,1.7,1.123L45.257,31H39.334Z"
            transform="translate(-10.958 -21.9)"
            fill="#fbb03b"
          />
          <path
            id="Path_190"
            data-name="Path 190"
            d="M13.307,34.813H20.43a1.007,1.007,0,1,0,0-2.013H13.307A1,1,0,0,0,12.3,33.807,1.025,1.025,0,0,0,13.307,34.813Z"
            transform="translate(-8.506 -28.58)"
            fill="#fbb03b"
          />
          <path
            id="Path_191"
            data-name="Path 191"
            d="M8.407,44.813H15.53a1.007,1.007,0,1,0,0-2.013H8.407A1,1,0,0,0,7.4,43.807,1.025,1.025,0,0,0,8.407,44.813Z"
            transform="translate(-5.503 -34.709)"
            fill="#fbb03b"
          />
          <path
            id="Path_192"
            data-name="Path 192"
            d="M11.675,53.807A1,1,0,0,0,10.668,52.8H3.507a1.007,1.007,0,1,0,0,2.013H10.63A.986.986,0,0,0,11.675,53.807Z"
            transform="translate(-2.5 -40.838)"
            fill="#fbb03b"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default ShippingIcon;
