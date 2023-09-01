import { useEffect } from "../index";
const dataAdClient = import.meta.env.VITE_DATA_ADS_CLIENT

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.error(e);
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
