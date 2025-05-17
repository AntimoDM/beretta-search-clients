import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "@/src/components/atoms/Button";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";
//import SearchBarV2 from "../../src/components/atoms/SearchBarV2/SearchBarV2";
import Load from "@/src/components/atoms/Load";
import Link from "next/link";
import Card from "@/src/components/atoms/Card";
import CardToolbar from "@/src/components/molecules/CardToolbar/CardToolbar";
import PageTitle from "@/src/components/molecules/PageTitle";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import { trackPromise } from "react-promise-tracker";
import api from "@/src/utils/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import { formatDate } from "@/src/utils/utility";
import Login from "@/src/components/atoms/Login/Login";

export default function home({ permission, router, language_ids }) {
  return <></>;
}
