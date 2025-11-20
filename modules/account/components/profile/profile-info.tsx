"use client";

import { useAuth } from "@/lib/hooks";
import { User, Mail, Phone, Calendar, UserCircle } from "lucide-react";
import { getGenderLabel, formatBirthday } from "../../helpers";

export function ProfileInfo() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const birthdayInfo = formatBirthday(user.birthday);

  const infoItems = [
    {
      icon: User,
      label: "Họ và tên",
      value: user.fullName,
      isDate: false,
    },
    {
      icon: Mail,
      label: "Email",
      value: user.email,
      isDate: false,
    },
    {
      icon: Phone,
      label: "Số điện thoại",
      value: user.phone,
      isDate: false,
    },
    {
      icon: UserCircle,
      label: "Giới tính",
      value: getGenderLabel(user.gender),
      isDate: false,
    },
    {
      icon: Calendar,
      label: "Ngày sinh",
      value: birthdayInfo.display,
      isDate: true,
      dateTime: birthdayInfo.dateTime,
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Thông tin tài khoản</h2>

      <div className="space-y-6">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-b-0 last:pb-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                {item.isDate && item.dateTime ? (
                  <p className="text-base font-medium text-foreground break-words">
                    <time dateTime={item.dateTime}>{item.value}</time>
                  </p>
                ) : (
                  <p className="text-base font-medium text-foreground break-words">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
