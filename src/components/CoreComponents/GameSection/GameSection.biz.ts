import { CallApi } from "@/settings/axiosConfig";
import { ICoffeeShopDetail } from "@/types/responses/ResponsesTypes";
import { useEffect, useState } from "react";

export const useGameSection = ({ coffee }: { coffee: ICoffeeShopDetail }) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeSans, setActiveSans] = useState("");

  const [dates, setDates] = useState([]);
  const [sanseis, setSanseis] = useState([]);
  const [eventList, setEventList] = useState([]);

  const [loadingSans, setLoadingSans] = useState(false);
  const [loadingDate, setLoadingDate] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);

  useEffect(() => {
    setLoadingDate(true);
    CallApi.get(`/hosts/${coffee.id}/dates`)
      .then(({ data }: any) => {
        setDates(data);
        setActiveDate(data?.[0].id);
      })
      .finally(() => {
        setLoadingDate(false);
      });
  }, []);

  useEffect(() => {
    if (!activeDate) return;
    setLoadingSans(true);
    CallApi.get(`/hosts/${coffee.id}/dates/${activeDate}/times`)
      .then(({ data }: any) => {
        setSanseis(data);
        setActiveSans(data?.[0]?.id);
      })
      .finally(() => {
        setLoadingSans(false);
      });
  }, [activeDate]);

  useEffect(() => {
    if (!activeDate || !activeSans) return;
    setLoadingEvent(true);
    CallApi.get(
      `/hosts/${coffee.id}/dates/${activeDate}/times/${activeSans}/_events`
    )
      .then(({ data }: any) => {
        setEventList(data);
      })
      .finally(() => {
        setLoadingEvent(false);
      });
  }, [activeSans]);

  return {
    dates,
    activeDate,
    setActiveDate,
    sanseis,
    activeSans,
    setActiveSans,
    eventList,
    loadingDate,
    loadingEvent,
    loadingSans,
  };
};
