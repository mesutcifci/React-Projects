import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const SmileIconWithBackground = ({
  viewBox = "0 0 70 70",
  width = "70",
  height = "70",
  sx = { width: "70px", height: "70px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      <g
        id="smileIconWithBackground"
        data-name="Smile Icon With Background"
        transform="translate(-597 -708)"
      >
        <rect
          id="Rectangle_661"
          data-name="Rectangle 661"
          width="39"
          height="39"
          rx="10"
          transform="translate(597 708)"
          fill="#fff3df"
        />
        <g id="noun_Happy_1563582" transform="translate(606 716.667)">
          <path
            id="Path_193"
            data-name="Path 193"
            d="M24.167,31.444a.722.722,0,0,1,.722.722.722.722,0,0,0,1.444,0,2.167,2.167,0,0,0-4.333,0,.722.722,0,0,0,1.444,0A.722.722,0,0,1,24.167,31.444Z"
            transform="translate(-16.389 -22.944)"
            fill="#fbb03b"
          />
          <path
            id="Path_194"
            data-name="Path 194"
            d="M56.167,30A2.167,2.167,0,0,0,54,32.167a.722.722,0,0,0,1.444,0,.722.722,0,1,1,1.444,0,.722.722,0,0,0,1.444,0A2.167,2.167,0,0,0,56.167,30Z"
            transform="translate(-42.611 -22.944)"
            fill="#fbb03b"
          />
          <path
            id="Path_195"
            data-name="Path 195"
            d="M10.667,2a8.667,8.667,0,1,0,8.667,8.667A8.667,8.667,0,0,0,10.667,2Zm0,15.889a7.222,7.222,0,1,1,7.222-7.222A7.222,7.222,0,0,1,10.667,17.889Z"
            fill="#fbb03b"
          />
          <path
            id="Path_196"
            data-name="Path 196"
            d="M35.987,58.209l-.422.424a2.835,2.835,0,0,1-3.911,0l-.422-.424a.723.723,0,0,0-1.022,1.022l.424.422a4.207,4.207,0,0,0,5.958,0l.424-.422a.723.723,0,1,0-1.022-1.022Z"
            transform="translate(-22.943 -45.887)"
            fill="#fbb03b"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default SmileIconWithBackground;
