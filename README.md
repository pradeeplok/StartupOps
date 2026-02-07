# StartupOps - The Operating System for Early-Stage Founders

**StartupOps** is a unified workspace designed to help early-stage founders manage execution, validate ideas, and align teams without juggling multiple fragmented tools.

![StartupOps Dashboard](https://via.placeholder.com/800x400?text=StartupOps+Dashboard+Preview)

## 🚀 Key Features

*   **Founder's Command Center**: A real-time dashboard integrating health scores, financial runway, and strategic AI insights.
*   **Execution Roadmap (Live Kanban)**: Drag-and-drop task management with milestone tracking and simulated real-time sync.
*   **Validation Engine**: Analyze customer feedback with Sentiment Gauges and detailed trend charts.
*   **Financial Monitor**: Track burn rate, MRR (displayed in ₹), and runway alerts.
*   **Role-Based Access Control**:
    *   **Founder Mode**: Full access to financials, settings, and strategic data.
    *   **Team Member Mode**: Focused view on tasks and roadmap execution.
*   **Investor Pitch Generator**: Auto-generate pitch deck outlines based on live startup data.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite)
*   **Styling**: Vanilla CSS (Variables & Flexbox/Grid) for maximum customization
*   **Routing**: React Router DOM v6
*   **Icons**: Lucide React
*   **Charts**: Recharts (Data Visualization)
*   **Drag & Drop**: @dnd-kit/core
*   **Deployment**: Vercel Ready (`vercel.json` included)

## 🏗️ Architecture

```mermaid
graph TD
    user[User (Founder/Member)] -->|Access| Client[Client Browser (React/Vite)]
    
    subgraph "Frontend Layer"
        Client --> Router[React Router]
        Router --> Auth[Firebase Auth Wrapper]
        
        subgraph "Core Modules"
            Dash[Command Center]
            Road[Execution Roadmap]
            Valid[Validation Engine]
            Fin[Financial Module]
        end
        
        Auth --> Dash
        Auth --> Road
        Auth --> Valid
        Auth --> Fin
    end
    
    subgraph "Backend Layer (Firebase)"
        Auth -.->|Authentication| FB_Auth[Firebase Auth]
        Dash <-->|Real-time Sync| Firestore[Firestore DB]
        Road <-->|Kanban State| Firestore
        Valid <-->|Feedback Data| Firestore
    end
    
    subgraph "External/AI"
        Valid -.->|Analysis| AI[AI Sentiment Engine]
    end
```

## 🔄 The Innovation Loop (Feedback-to-Task)
StartupOps features a closed-loop system for continuous improvement:
1.  **Capture**: User submits feedback via the **Public Validation Page** (`/validate/:id`).
2.  **Analyze**: The **Validation Engine** visualizes sentiment and trends.
3.  **Act**: Founders click **"Add to Roadmap"** on any feedback item.
4.  **Execute**: The item instantly becomes a **Task** in the Kanban backlog for the team to implement.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/startupops.git
    cd startupops
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Navigate to `http://localhost:5173`

## 👥 Roles & Permissions Demo

The application features a **Role Switcher** in the sidebar footer.
- **Toggle to "Member"**: Financial data and strategic health scores are hidden.
- **Toggle to "Founder"**: Full access to all sensitive metrics.

---
*Built for Innovation Hackathon 2026*
