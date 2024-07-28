import { Geojson } from 'react-native-maps';
import seven from '../assets/lines/7.json';
import one from '../assets/lines/123.json';
import four from '../assets/lines/456.json';
import A from '../assets/lines/ACE.json';
import B from '../assets/lines/BDFM.json';
import G from '../assets/lines/G.json';
import J from '../assets/lines/JZ.json';
import L from '../assets/lines/L.json';
import N from '../assets/lines/NQRW.json';
import S from '../assets/lines/S.json';

export default function GeoJsons() {
  return (
    <>
      <Geojson geojson={seven as any} strokeColor="#ba33ad" strokeWidth={2} />
      <Geojson geojson={one as any} strokeColor="#ee352e" strokeWidth={2} />
      <Geojson geojson={four as any} strokeColor="#00933c" strokeWidth={2} />
      <Geojson geojson={A as any} strokeColor="#0139a6" strokeWidth={2} />
      <Geojson geojson={B as any} strokeColor="#ff6318" strokeWidth={2} />
      <Geojson geojson={G as any} strokeColor="#6cbe44" strokeWidth={2} />
      <Geojson geojson={J as any} strokeColor="#996633" strokeWidth={2} />
      <Geojson geojson={L as any} strokeColor="#a6a9ac" strokeWidth={2} />
      <Geojson geojson={N as any} strokeColor="#fbcc0a" strokeWidth={2} />
      <Geojson geojson={S as any} strokeColor="#a6a9ac" strokeWidth={2} />
    </>
  );
}
