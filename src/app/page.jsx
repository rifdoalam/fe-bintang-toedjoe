"use client";
import MainLayout from "@/components/layouts/main-layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/zoom/meetings`);
      setData(res.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/zoom/meeting/${id}`, {});
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div className="w-full h-full bg-whit flex flex-col justify-center items-center ">
        <div className="w-full relative overflow-x-auto container mx-auto">
          <div className="flex">
            <ModalAdd />
          </div>
          <table className="w-full text-sm text-left rtl:text-right overflow-hidden text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Agenda
                </th>
                <th scope="col" className="px-6 py-3">
                  Topic
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  Schedule For
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Time Zone
                </th>
                <th scope="col" className="px-6 py-3">
                  Time Zone
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data?.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item?.agenda}</td>
                      <td className="px-6 py-4">{item?.topic}</td>
                      <td className="px-6 py-4">{item?.duration}</td>
                      <td className="px-6 py-4">{item?.password}</td>
                      <td className="px-6 py-4">{item?.schedule_for}</td>
                      <td className="px-6 py-4">{item?.start_time}</td>
                      <td className="px-6 py-4">{item?.timezone}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <a target="_blank" href={`${item?.url}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Join
                        </a>
                        <ModalEdit id={item?.id} valData={item} />
                        <button
                          type="button"
                          onClick={() => handleDelete(item?.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

const ModalAdd = () => {
  const [data, setData] = useState({ timezone: "Asia/Jakarta" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const date = new Date(data?.start_time);
      date.setHours(20, 0, 0, 0);
      const utcDate = date.toISOString();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/zoom/create-meeting`, { ...data, start_time: utcDate });
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4" variant="outline">
          Tambah Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Agenda</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, agenda: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Topic</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, topic: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Start Time</label>
              <input
                type="datetime-local"
                onChange={(e) => setData({ ...data, start_time: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Duration</label>
              <input
                type="number"
                onChange={(e) => setData({ ...data, duration: parseInt(e.target.value) })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>{" "}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Password</label>
              <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Schedule For</label>
              <input
                type="email"
                onChange={(e) => setData({ ...data, schedule_for: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
              />
            </div>
            <DialogFooter>
              <Button className="mt-4" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ModalEdit = ({ id, valData }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(valData);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const date = new Date(data?.start_time);
      date.setHours(20, 0, 0, 0);
      const utcDate = date.toISOString();
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/zoom/meeting/${id}`, { ...data, start_time: utcDate });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-none bg-transparent p-0  text-[14px]" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Agenda</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, agenda: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.agenda}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Topic</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, topic: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.topic}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Start Time</label>
              <input
                type="datetime-local"
                onChange={(e) => setData({ ...data, start_time: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.start_time}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Duration</label>
              <input
                type="number"
                onChange={(e) => setData({ ...data, duration: parseInt(e.target.value) })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.duration}
              />
            </div>{" "}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Password</label>
              <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.password}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">Schedule For</label>
              <input
                type="email"
                onChange={(e) => setData({ ...data, schedule_for: e.target.value })}
                className="border w-full p-2 rounded text-[14px]"
                id="name"
                value={data?.schedule_for}
              />
            </div>
            <DialogFooter>
              <Button className="mt-4" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
