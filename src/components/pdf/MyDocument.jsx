import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import Html from "react-pdf-html";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingTop: 24,
    paddingBottom: 24,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#2b3437",
    fontFamily: "Times-Roman",
  },
  letterhead: { width: "100%", height: 110, objectFit: "contain", marginBottom: 12 },
  refsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  refBlock: { flexDirection: "column", gap: 4 },
  refLine: { flexDirection: "row", alignItems: "center", gap: 6 },
  refLabel: { fontSize: 11, fontStyle: "italic", fontWeight: 700, color: "#586064" },
  refValue: { fontSize: 12, fontWeight: 600, color: "#2b3437" },
  date: { fontSize: 12, fontWeight: 600, color: "#586064" },
  greeting: { marginBottom: 8, fontSize: 12, lineHeight: 1.5 },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#2b3437",
  },
  content: { flexGrow: 1 },
  footer: {
    marginTop: 8,
    height: 120,
    flexDirection: "row",
  },
  footerLeft: { flex: 1, flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 4 },
  footerCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
  footerRight: { flex: 1 },
  signerBlock: { flexDirection: "column" },
  signer: { fontSize: 12, fontWeight: 700, color: "#2b3437", marginTop: 0 },
  signerRole: { fontSize: 11, color: "#2b3437", marginTop: 2 },
  stamp: { width: 145, height: 90, objectFit: "contain" },
  signature: { width: 120, height: 65, objectFit: "contain", marginBottom: -20 },
});

const asset = (path) => new URL(path, window.location.href).href;

export default function MyDocument({ title, letterTitle, ourRef, yourRef, contentHtml, letterheadSrc, stampSrc, signatureSrc }) {
  const displayTitle = letterTitle?.trim() ? letterTitle : title?.trim() || "Untitled Letter";
  const today = new Date().toLocaleDateString("en-UK", { month: "numeric", day: "numeric", year: "numeric" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image style={styles.letterhead} src={letterheadSrc || asset("/letterhead-placeholder.svg")} />
          <View style={styles.refsRow}>
            <View style={styles.refBlock}>
              <View style={styles.refLine}>
                <Text style={styles.refLabel}>Our Ref:</Text>
                <Text style={styles.refValue}>{ourRef || ""}</Text>
              </View>
              <View style={styles.refLine}>
                <Text style={styles.refLabel}>Your Ref:</Text>
                <Text style={styles.refValue}>{yourRef || ""}</Text>
              </View>
            </View>
            <Text style={styles.date}>{today}</Text>
          </View>
        </View>

        <Text style={styles.greeting}>Dear Sir/Ma,</Text>

        {displayTitle ? <Text style={styles.title}>{displayTitle}</Text> : null}

        <View style={styles.content}>
          <Html
            stylesheet={{
              body: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              div: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              span: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              ul: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              ol: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              li: { fontSize: 12, lineHeight: 1.5, color: "#2b3437" },
              h1: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              h2: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              h3: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              h4: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              h5: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              h6: { fontSize: 12, marginBottom: 6, fontWeight: 700, color: "#2b3437" },
              p: { fontSize: 12, marginBottom: 6, lineHeight: 1.5, color: "#2b3437" },
              strong: { fontWeight: 700 },
              em: { fontStyle: "italic" },
              img: {
                width: 130,
                height: "auto",
                objectFit: "contain",
                margin: 0,
              },
            }}
          >
            {contentHtml || ""}
          </Html>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Image style={styles.signature} src={signatureSrc || asset("/signature-placeholder.svg")} />
            <View style={styles.signerBlock}>
              <Text style={styles.signer}>(Your Name)</Text>
              <Text style={styles.signerRole}>(Title)</Text>
            </View>
          </View>

          <View style={styles.footerCenter}>
            <Image style={styles.stamp} src={stampSrc || asset("/stamp-placeholder.svg")} />
          </View>

          <View style={styles.footerRight} />
        </View>
      </Page>
    </Document>
  );
}
