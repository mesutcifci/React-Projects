import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ProductCareIcon = ({
  viewBox = "0 0 70 70",
  width = "70",
  height = "70",
  sx = { width: "70px", height: "70px" },
  id,
}: SvgIconProps) => {
  return (
    <SvgIcon {...{ viewBox, width, height, sx }} data-testid={id}>
      <image
        id="Image_2"
        data-name="Image 2"
        width="215"
        height="28"
        href="data:image/png;base64,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"
      />
    </SvgIcon>
  );
};

export default ProductCareIcon;
