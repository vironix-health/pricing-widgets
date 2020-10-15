import {
  Button,
  Card,
  InputNumber,
  Form,
  Select,
  Typography,
  Space,
} from "antd";
import "./App.less";
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BloodTestCompare = () => {
  const [OrgSize, setOrgSize] = useState(10);
  const [SelectedPlan, setSelectedPlan] = useState("free");
  const [PriceCovidX, setPriceCovidX] = useState(0);
  const [PriceTest, setPriceTest] = useState(0);
  const [CostDiagnosticTest, setCostDiagnosticTest] = useState(100);

  const handleChange = (value) => {
    setSelectedPlan(value);
  };

  useEffect(() => {
    if (SelectedPlan === "free") {
      if (OrgSize >= 40) {
        setSelectedPlan("standard");
      } else {
        setPriceCovidX(0);
        setPriceTest(OrgSize * CostDiagnosticTest);
      }
    } else if (SelectedPlan === "standard") {
      setPriceCovidX(5 * OrgSize);
      setPriceTest(OrgSize * CostDiagnosticTest);
    }
  }, [OrgSize, SelectedPlan, CostDiagnosticTest]);

  return (
    <Form>
      <Row style={{ border: "1px solid" }}>
        <Col span={14} style={{ padding: "32px" }}>
          <Space direction="vertical" size={16}>
            <Form.Item label="Select Plan">
              <Select
                defaultValue="free"
                style={{ width: 120 }}
                onChange={handleChange}
                value={SelectedPlan}
              >
                <Select.Option value="free">Free</Select.Option>
                <Select.Option value="standard">Standard</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Organization Members">
              <InputNumber
                value={OrgSize}
                onChange={(value) => {
                  setOrgSize(value);
                }}
              />
            </Form.Item>
            <Form.Item label="Covid19 Diagnostic Test Cost">
              ${" "}
              <InputNumber
                value={CostDiagnosticTest}
                onChange={(value) => {
                  setCostDiagnosticTest(value);
                }}
              />
            </Form.Item>
          </Space>
        </Col>
        <Col
          span={10}
          style={{
            backgroundColor: "#993333",
            padding: "32px",
          }}
        >
          <Row>
            <Space direction="vertical" size={16}>
              <Typography.Title level={3} style={{ color: "#fff" }}>
                It would cost your organization{" "}
                <span style={{ color: "#eeb55f" }}>
                  ${numberWithCommas(PriceCovidX * 12)}/year
                </span>{" "}
                compared to{" "}
                <span style={{ color: "#eeb55f" }}>
                  ${numberWithCommas(PriceTest)}
                </span>{" "}
                to test your organization members{" "}
                <span style={{ textDecoration: "underline" }}>once</span> for
                Covid-19.
              </Typography.Title>
            </Space>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

function App() {
  return (
    <div className="App" style={{ padding: "50px", width: "800px" }}>
      <BloodTestCompare />
    </div>
  );
}

export default App;
