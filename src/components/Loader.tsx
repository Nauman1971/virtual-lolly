import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loader({ loading }) {
    return (
        <div style={{ marginTop: '20%' }}>
            <HashLoader
                loading={loading}
                color="#D036D7"
                css={override}
                size={400} />
        </div>
    )
}
