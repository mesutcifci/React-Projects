import { Layout } from "antd";
import React from "react";

const Footer = () => {
  return (
    <Layout className="!bg-[#001529] !grow-0">
      <Layout.Footer className="text-center !text-white !bg-[#001529] flex items-center justify-center">
        <address className="mb-0 mr-2">
          Created by
          <a
            rel="author"
            href="https://github.com/mesutcifci"
            target="_blank"
            className="text-white mx-2"
          >
            @Mesut Çifci
          </a>
          on
        </address>
        <time dateTime="2022" title="2022">
          2022
        </time>
      </Layout.Footer>
    </Layout>
  );
};

export default Footer;
