import { useEffect } from "../index";
const dataAdClient = import.meta.env.VITE_DATA_ADS_CLIENT
console.log('====================================');
console.log(dataAdClient, 'data ad client no');
console.log('====================================');

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponent;
