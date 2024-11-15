import moment from "jalali-moment";
import toast from "react-hot-toast";

export const handleAttText = (status, type) => {
  if (status === "login") {
    if (type === 0) return "ورود";
    if (type === 1) return "ورود با مرخصی";
    if (type === 2) return "ورود با ماموریت";
  }

  if (status === "logout") {
    if (type === 0) return "خروج";
    if (type === 1) return "خروج با مرخصی";
    if (type === 2) return "خروج با ماموریت";
  }
};

// فرمت تاریخی که از بک اند میگیرد را به فرمت
// input : 2024-06-21T00:00:00Z
// بطور مثال : چهارشنبه 20 تیر 1403
// تبدیل میکند
export const handleISOToDateFormat = (iso) => {
  const dayOfWeek = moment(iso, "YYYY/MM/DD").locale("fa").format("dddd");
  const day = moment(iso, "YYYY/MM/DD").locale("fa").format("DD");
  const month = moment(iso, "YYYY/MM/DD").locale("fa").format("MMMM");
  const year = moment(iso, "YYYY/MM/DD").locale("fa").format("YYYY");

  return `${dayOfWeek} ${day} ${month} ${year}`;
};
// برعکس
export const handleConvertDateToISO = (date) => {
  const convertedDate = moment(date, "jYYYY/jMM/jDD").locale("en");
  const currentTime = moment();
  const combinedMoment = moment(
    convertedDate.format("YYYY-MM-DD") +
      "T" +
      currentTime.format("00:00:00") +
      "Z"
  );

  return combinedMoment.toISOString();
};

export const handleConvertTimeToISO = (date, time) => {
  const convertedDate = moment(date, "jYYYY/jMM/jDD").locale("en");
  const currentTime = moment(time, "HH:mm");
  const combinedMoment = moment(
    convertedDate.format("YYYY-MM-DD") +
      "T" +
      currentTime.format("HH:mm:ss") +
      "Z"
  );

  return combinedMoment.toISOString();
};

// برای گرفتن ساعت از فرمت ارسالی از دیتا
// input : 2024-07-14T08:46:56.1308859
// output :
export const handleGetTimeFromData = (date) => {
  if (date) {
    const getJustTime = date.split("T")[1]?.split(".")[0]?.split(":");
    if (getJustTime) {
      return `${getJustTime[0]}:${getJustTime[1]}`;
    } else {
      return date.split("T")[1];
    }
  } else {
    return "";
  }
};

export const handleGetDateFromData = (date) => {
  if (date) {
    const getJustDate = date.split("T")[0].replaceAll("-", "/");
    const convertedToJalali =
      getJustDate.split("/")[0] > 1300
        ? moment(getJustDate, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")
        : null;
    return convertedToJalali;
  } else {
    return "";
  }
};

export const handleCopy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("با موفقیت کپی شد");
    })
    .catch(() => {
      toast.error("مشکلی در کپی متن بوجود امد");
    });
};

// ساعتی مثل 12:0 را گرفته
// و به فرمتی مثل 12:00
// تبدیل میکند
export function formatTime(time) {
  let [hours, minutes] = time.split(":");

  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  // Return the formatted time
  return `${hours}:${minutes}`;
}

export const showNotificationForUpdate = (registration) => {
  toast(
    (t) => (
      // <div className="flex flex-col gap-2 w-full">
      //   <div className="flex gap-2 min-w-[150px]">
      //     <b>
      //       نسخه های جدیدی در دسترس قرار گرفت! لطفا صفحه را دوباره بارگذاری کنید
      //     </b>
      //     <img
      //       src={"/favicon.ico"}
      //       className="w-10 h-10 rounded-lg object-cover"
      //       alt=""
      //     />
      //   </div>
      //   <button
      //     className="w-full rounded-lg border-none bg-blue-500 text-[white] py-3"
      //     type="primary"
      //     onClick={() => toast.dismiss(t.id)}
      //   >
      //     متوجه شدم
      //   </button>
      // </div>
      <div>
        <p>نسخه های جدیدی در دسترس قرار گرفت!</p>
        <button
          onClick={() => {
            // Dismiss the toast
            toast.dismiss(t.id);

            // Trigger the update
            if (registration.waiting) {
              registration.waiting.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          }}
          style={{
            marginTop: "8px",
            padding: "4px 12px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          بروزرسانی
        </button>
      </div>
    ),
    {
      // icon: <FcCheckmark size={"2em"} />,
      duration: Infinity,
      position: "bottom-right",
    }
  );
};
