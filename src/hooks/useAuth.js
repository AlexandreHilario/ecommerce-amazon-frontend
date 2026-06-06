"use client";

import { useState } from "react";

export function useAuth() {
  const [user] = useState({ sub: "admin@teste.com", role: "ROLE_ADMIN" });
  const [loading] = useState(false);

  return { user, loading };
}