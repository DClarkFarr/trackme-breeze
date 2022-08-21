import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        Icons({ compiler: "jsx", jsx: "react" }),
        react(),
    ],
});
