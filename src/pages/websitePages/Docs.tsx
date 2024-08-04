import React, { useState } from "react";

import InputStyle from "../../components/common/form/InputStyle";
import { InputText } from "primereact/inputtext";

const DocsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="grid">
        <div className="col-4">
          <InputStyle>
            <span className="p-input-icon-right w-full">
              <i className="pi pi-search" />
              <InputText
                className="border-none"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="חפש מאמר בעסק"
              />
            </span>
          </InputStyle>
        </div>
        {/* <DocsList searchTerm={searchTerm} /> */}
      </div>
    </>
  );
};

export default DocsPage;
