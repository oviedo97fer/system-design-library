import React from "react";
import { IconButton } from "@mui/material";
import { Stack} from "@mui/system";
import { PaymentResult, PayWith, PermitTicketProps } from "./types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  usePDF,
  DocumentProps
} from "@react-pdf/renderer";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    borderRadius: 8,
  },
  container: {
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: 300,
    backgroundColor: '#f8f9fa',
    alignSelf: 'center',
    padding: 10
  },
  row: {
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    margin: 0,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 10,
    borderStyle:"dashed"
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const PermitTicket: React.FC<PermitTicketProps> = ({
  paymentData,
  plate
}) => {
  const [{ loading, error, ...instance }] = usePDF({
    document: <PDFDocument paymentData={paymentData} plate={plate} />,
  });

  console.log({
    paymentData,
    loading,
    error,
  });

  const downloadFile = () => {
    console.log(instance.blob);
    let documentObjectURL;
    if (instance.blob) {
      documentObjectURL = URL.createObjectURL(instance.blob);
    }

    if (documentObjectURL) {
      const a = document.createElement("a");
      a.href = documentObjectURL;
      a.download = "ticket.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Stack spacing={2} position={"relative"} py={1} pt={3} px={1.5}>
      <IconButton
        onClick={downloadFile}
        sx={{
          position: "absolute",
          top: ".2rem",
          left: ".6rem",
          zIndex: 3,
        }}
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
      <Stack>
        <PDFDocument paymentData={paymentData} plate={plate}></PDFDocument>
      </Stack>
    </Stack>
  );
};

interface PDFDocumentProps extends DocumentProps {
  paymentData: PaymentResult;
  plate: string
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ paymentData, plate}) => {
  // const [qrCodeData, setQrCodeData] = React.useState("");

  // React.useEffect(() => {
  //   const generateQRCode = async () => {
  //     try {
  //       const url = await QRCode.toDataURL('test124241', { errorCorrectionLevel: 'H' });
  //       setQrCodeData(url);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   generateQRCode();
  // }, []);
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.container}>
          <View style={styles.row}>
            {/* <View >
            {qrCodeData && (
                <Svg source={qrCodeData} src={qrCodeData} style={{ width: 180, height: 180 }} />
              )}
            </View> */}
            <View style={{ flex: 1 }}>
             <View>
              <View style={styles.column}>
                <View style={styles.row}>
                  <Text style={styles.text}>
                    Start Date:
                  </Text>
                  <Text style={styles.text}>
                  {dayjs.utc(paymentData.billing.startDate).format("LTS")}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>
                  End Date: 
                  </Text>
                  <Text style={styles.text}>
                    {dayjs.utc(paymentData.billing.step.endDate).format("LTS")}
                  </Text>
                </View>
              </View>
            </View> 
            <hr style={styles.divider} />

           <View>
            <View style={styles.row}>
                <Text style={styles.text}>
                  Card: 
                </Text>
              <Text style={styles.text}>
              {paymentData.operation?.creditCardPan}
              </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>
                  Pay With:
                </Text>
              <Text style={styles.text}>
              {PayWith[paymentData.billing.payWith || 0]}
              </Text>
            </View>
            <View style={styles.row}>
              
                <Text style={styles.text}>
                 Plate
                </Text>
              <Text style={styles.text}>{plate}</Text>
            </View>
          </View>
          </View>
          </View>

          
          <hr style={styles.divider} />

          {/* Información de precios */}
          <View>
            <View style={styles.row}>
             <Text style={{...styles.text, ...styles.boldText}}>
                Amount:
              </Text>
              <Text style={{...styles.text, ...styles.boldText}}>
              {!isNaN(paymentData.billing.step.amountPlusVat)
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                        notation: "compact",
                      }).format(paymentData.billing.step.amountPlusVat)
                    : '-'}
              </Text>
            </View>
            <View style={styles.row}>
             <Text style={{...styles.text, ...styles.boldText}}>
                Fees:
              </Text>
              <Text style={{...styles.text, ...styles.boldText}}>
              {!isNaN(paymentData.billing.step.feePlusVat)
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                        notation: "compact",
                      }).format(paymentData.billing.step.feePlusVat)
                    : '-'}
              </Text>
            </View>
            <View style={styles.row}>
             <Text style={{...styles.text, ...styles.boldText}}>
                Total:
              </Text>
              <Text style={{...styles.text, ...styles.boldText}}>
                {!isNaN(paymentData.billing.step.total)
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                      notation: "compact",
                    }).format(paymentData.billing.step.total)
                  : '-'}
              </Text>
            </View>
          </View> 
        </View>
      </Page>
    </Document>
  );
};

export default PermitTicket;