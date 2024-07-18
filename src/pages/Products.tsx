import { formatDate } from '@/helper';
import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  PDFViewer,
  Svg,
  Rect,
  Path
} from '@react-pdf/renderer';
import { SquareX } from 'lucide-react';

const COLOR = {
  black: '#000000'
};

const FONTSIZENORMAL = 10;

function ShapeCol1({ data }) {
  const Row = ({ title, value, hasBorder = true }: any) => {
    return (
      <View
        style={{ flexDirection: 'row', borderBottomWidth: hasBorder ? 1 : 0 }}
      >
        <View style={{ width: 50, borderRightWidth: 1, padding: 5 }}>
          <Text style={{ fontSize: FONTSIZENORMAL }}>{title}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ marginLeft: 8, fontSize: FONTSIZENORMAL }}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ borderWidth: 1, height: 45, marginTop: 10 }}>
      <Row title="Nomor" value={data?.no} />
      <Row title="Tanggal" value={formatDate(data?.date)} hasBorder={false} />
    </View>
  );
}

function PDF({ data }) {
  const items = [...data?.items, ...data?.items];
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              fontWeight: 700,
              fontSize: 19
            }}
          >
            <Text style={{ fontWeight: 800, marginBottom: 10 }}>
              FAKTUR / INVOICE
            </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 6,
                  marginBottom: 4
                }}
              >
                <View
                  style={{
                    width: 54,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>Dari </Text>
                  <Text style={{ fontSize: FONTSIZENORMAL }}>: </Text>
                </View>

                <Text style={{ fontSize: FONTSIZENORMAL }}>{data?.from}</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                <View
                  style={{
                    width: 54,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>N.P.W.P </Text>
                  <Text style={{ fontSize: FONTSIZENORMAL }}>: </Text>
                </View>

                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  {data?.from_npwp}{' '}
                </Text>
              </View>

              <ShapeCol1 data={data} />
            </View>

            <View
              style={{
                borderWidth: 1,
                flex: 1,
                padding: 8,
                height: 82,
                display: 'flex'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  Kepada : {data?.to}
                </Text>
              </View>

              <Text style={{ fontSize: FONTSIZENORMAL }}>
                N.P.W.P : {data?.to_npwp}{' '}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderBottomWidth: 0,
              height: 416,
              marginTop: 10
            }}
          >
            <View style={{ borderBottomWidth: 1, flexDirection: 'row' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  width: 32
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>No</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>U R A I A N</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 0.5
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>Quantity</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 0.5
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>Harga Satuan</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  flex: 0.5
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  Jumlah Harga / Total
                </Text>
              </View>
            </View>

            {items?.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row'
                }}
                key={index}
              >
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRight: 1,
                    width: 32
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>{index + 1}</Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRight: 1,
                    flex: 1,
                    paddingBottom: 20,
                    paddingTop: index == 0 ? 10 : 0
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>
                    {item?.uraian}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRight: 1,
                    flex: 0.5,
                    paddingTop: index == 0 ? 10 : 0
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>
                    {item?.quantity}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRight: 1,
                    flex: 0.5,
                    paddingTop: index == 0 ? 10 : 0
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>
                    {item?.unit_price}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    flex: 0.5,
                    paddingTop: index == 0 ? 10 : 0
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>
                    {item?.total}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ borderWidth: 1, borderBottomWidth: 0 }}>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>Jumlah harga</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  // flex: 0.39
                  width: 111.1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  width: 111
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  width: 110
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>{data?.total}</Text>
              </View>
            </View>

            <View style={{ borderBottomWidth: 1, flexDirection: 'row' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  Potongan Harga / Discount
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  // flex: 0.39
                  width: 111.1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  width: 111
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  width: 110
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>{data?.total}</Text>
              </View>
            </View>

            <View style={{ borderBottomWidth: 1, flexDirection: 'row' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  Dasar Pengenaan Pajak
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  // flex: 0.39
                  width: 111.1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  width: 111
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  width: 110
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>{data?.total}</Text>
              </View>
            </View>

            <View style={{ borderBottomWidth: 1, flexDirection: 'row' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  flex: 1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>
                  Pajak Pertambahan Nilai
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  // flex: 0.39
                  width: 111.1
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  borderRight: 1,
                  width: 111
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}></Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  width: 110
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>{data?.total}</Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 6,
                  flex: 1,
                  flexDirection: 'row',
                  gap: 10
                }}
              >
                <Text style={{ fontSize: FONTSIZENORMAL }}>Terbilang :</Text>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: FONTSIZENORMAL,
                      lineHeight: 1.5,
                      fontWeight: 'bold'
                    }}
                  >
                    ENAM BELAS JUTA DUA RATUS LIMA PULUH RIBU RUPIAH EMPAT RATUS
                    RUPIAH ENAM BELAS JUTA DUA RATUS LIMA PULUH RIBU RUPIAH
                    EMPAT
                  </Text>
                </View>
              </View>

              <View
                style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}
              >
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 6,
                    width: 112,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#000',
                    height: 30
                  }}
                >
                  <Text style={{ fontSize: FONTSIZENORMAL }}>
                    {data?.total}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{ fontSize: FONTSIZENORMAL, textAlign: 'center' }}
                  >
                    S.E. & O
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                rowGap: 3
              }}
            >
              {/*================== BANK MANDIRI ================== */}

              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Text style={{ fontSize: 7 }}>
                    Pembayaran harap ditransfer ke rekening yang bertanda{' '}
                  </Text>

                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ fontSize: 6 }}>X</Text>
                  </View>
                </View>

                <Text style={{ fontSize: 7 }}>Bank Mandiri</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Dawuan
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>:Acc No. 132.0080001762</Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>
                      :Acc No. 132.008200.2545
                    </Text>
                  </View>
                </View>
              </View>

              {/*================== BANK MANDIRI ================== */}

              {/*================== BANK BRI ================== */}

              <View>
                <Text style={{ fontSize: 7 }}>Bank BRI</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Cikampek
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>
                      :Acc No. 302-01-000037-30-6
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>
                      :Acc No. 1249-01-000002-30-0
                    </Text>
                  </View>
                </View>
              </View>

              {/*================== BANK BRI ================== */}

              {/*================== BANK BCA ================== */}

              <View>
                <Text style={{ fontSize: 7 }}>Bank BCA</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Cikampek
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>:Acc No. 378.3090046</Text>
                  </View>
                </View>
              </View>

              {/*================== BANK BCA ================== */}
            </View>

            <View
              style={{
                flex: 1,
                rowGap: 3,
                paddingTop: 10
              }}
            >
              {/*================== BANK BNI ================== */}

              <View>
                <Text style={{ fontSize: 7 }}>Bank BNI</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Dawuan
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>:Acc No. 265.2874</Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>US$ .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>:Acc No. 265.2885</Text>
                  </View>
                </View>
              </View>

              {/*================== BANK BNI ================== */}

              {/*================== BANK MEGA ================== */}

              <View>
                <Text style={{ fontSize: 7 }}>Bank MEGA</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Purwakarta
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>
                      :Acc No. 01-153-00-11-00004-0
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>
                      :Acc No. 01-153-00-11-00007-7
                    </Text>
                  </View>
                </View>
              </View>

              {/*================== BANK MEGA ================== */}

              {/*================== BANK BRI ================== */}

              <View>
                <Text style={{ fontSize: 7 }}>Bank BRI</Text>
                <Text style={{ fontSize: 7, marginBottom: 2 }}>
                  Cabang Cikampek
                </Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  ></View>

                  <View>
                    <Text style={{ fontSize: 7 }}>Rp .</Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 7 }}>:030201001360304</Text>
                  </View>
                </View>
              </View>

              {/*================== BANK BRI ================== */}
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Text
                style={{
                  textDecoration: 'underline',
                  textAlign: 'center',
                  fontSize: 12
                }}
              >
                Handin Rustian
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>
                Direktur Keuangan
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

function DonwloadPDF({ data }) {
  return <PDF data={data} />;
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  sizeFont: {
    fontSize: 12
  }
});

export default DonwloadPDF;
