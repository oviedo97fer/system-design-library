import React, { useState } from "react";
import { Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { PaymentResult, PayWith, PermitTicketProps } from "./types";
import { Page, Text, View, Document, StyleSheet, usePDF, DocumentProps } from "@react-pdf/renderer";
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
        borderRadius: 8
    },
    section: {
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    text: {
        fontSize: 12,
        marginBottom: 10
    },
    itemList: {
        marginBottom: 10
    },
    item: {
        fontSize: 12,
        marginBottom: 5
    },
    total: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10
    }
});

const PermitTicket: React.FC<PermitTicketProps> = ({ paymentData, ...props }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [{ loading, error, ...instance }, updateInstance] = usePDF({
        document: <PDFDocument paymentData={paymentData} />
    });

    console.log({
        paymentData,
        loading,
        error
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
                    zIndex: 3
                }}
            >
                <DownloadIcon fontSize="small" />
            </IconButton>
            <Stack>
                <PDFDocument paymentData={paymentData}></PDFDocument>
            </Stack>
        </Stack>
    );
};

interface PDFDocumentProps extends DocumentProps {
    paymentData: PaymentResult;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ paymentData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Ticket de Compra</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Card: {paymentData.operation?.creditCardPan}</Text>
                    <Text style={styles.text}>PayWith: {PayWith[paymentData.billing.payWith || 0]}</Text>
                    <Text style={styles.text}>
                        Start Date: {dayjs.utc(paymentData.billing.startDate).format("LTS")}
                    </Text>
                    <Text style={styles.text}>
                        End Date: {dayjs.utc(paymentData.billing.step.endDate).format("LTS")}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>--------------------------------------------------</Text>
                    {/*  {data.items.map((item, index) => (
				<Text key={index} style={styles.item}>
					{item.name} - Cantidad: {item.quantity} - Precio: {item.price}
				</Text>
			))} */}
                </View>
                <View>
                    <Text style={styles.total}>Total: {paymentData.billing.step.total}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PermitTicket;
